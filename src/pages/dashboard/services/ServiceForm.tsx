import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import Heading from "@/components/heading";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { servicesColumnSchema, TservicesColumnProps } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useNavigate, useParams } from "react-router-dom";
import getService from "@/actions/get-service";

export default function ServiceForm() {
	const { id } = useParams();
	const router = useNavigate();
	const [open, setOpen] = useState(false);
	const [image, setImage] = useState<string | null>(null);
	const [imageError, setImageError] = useState<string>("");

	const [services, setServices] = useState<TservicesColumnProps | null>(null);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				if (id) {
					const response = await getService(id);
					setServices(response.data);
				}
			} catch (err) {
				console.error("Error fetching services:", err);
			}
		};
		fetchServices();
	}, [id]);

	const formatedService = services
		? {
				title: services.title,
				description: services.description,
				short_description: services.short_description,
				image: services.image || "",
		  }
		: null;

	const form = useForm<TservicesColumnProps>({
		resolver: zodResolver(servicesColumnSchema),
		defaultValues: formatedService || {
			title: "",
			description: "",
			short_description: "",
			image: "",
		},
	});

	useEffect(() => {
		if (services) {
			form.reset({
				title: services.title,
				description: services.description,
				short_description: services.short_description,
				image: services.image || "",
			});
		}
	}, [services, form.reset]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageError("");
		const file = e.target.files?.[0];
		const allowedTypes = [
			"image/jpeg",
			"image/png",
			"image/jpg",
			"image/gif",
			"image/svg+xml",
		];

		if (file) {
			if (!file.type.startsWith("image/")) {
				setImageError("The file must be an image");
				return;
			}

			if (!allowedTypes.includes(file.type)) {
				setImageError("Only jpeg, png, jpg, gif, svg images are allowed");
				return;
			}

			const reader = new FileReader();
			reader.onload = () => {
				const base64 = reader.result as string;
				setImage(base64);
			};
			reader.readAsDataURL(file);
		}
	};

	const {
		formState: { isSubmitting },
	} = form;

	const initialData = formatedService;
	const action = initialData ? "Save changes" : "Create";
	const title = initialData ? "Edit service" : "Create service";
	const description = initialData ? "Edit service" : "Add a new service";
	const toastMessage = initialData ? "Service updated." : "Service created.";

	const dataURLtoBlob = (dataURL: string): Blob => {
		const byteString = atob(dataURL.split(",")[1]);
		const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ab], { type: mimeString });
	};

	const onSubmits = async (data: TservicesColumnProps) => {
		if (!image) {
			setImageError("Image is required");
			return;
		}

		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("short_description", data.short_description);
		formData.append("description", data.description);
		const blob = dataURLtoBlob(image);
		formData.append("image", blob, "image.png");

		try {
			if (initialData) {
				await axios.post(
					`https://themountingking.com/backend/api/service/${id}`,
					formData,
					{
						headers: { "Content-Type": "multipart/form-data" },
					},
				);
			} else {
				await axios.post(
					`https://themountingking.com/backend/api/service`,
					formData,
					{
						headers: { "Content-Type": "multipart/form-data" },
					},
				);
			}
			toast.success(toastMessage);
			router(`/dashboard/services`);
			router(0);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	const onDelete = async () => {
		try {
			await axios.delete(
				`https://themountingking.com/backend/api/service/${id}`,
			);
			router(`/dashboard/services`);
			router(0);
			toast.success("Service deleted");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		} finally {
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				loading={isSubmitting}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
			/>
			<div className="flex items-center justify-between px-5 py-2">
				<Heading
					title={title}
					description={description}
				/>
				{initialData && (
					<Button
						disabled={isSubmitting}
						variant="destructive"
						size="sm"
						onClick={() => setOpen(true)}>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmits)}
					className="space-y-4 w-full p-5">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Title"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="short_description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Short Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Short Description"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Description"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Image</FormLabel>
								<FormControl>
									<Input
										placeholder="Image"
										type="file"
										accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
										onChange={(e) => {
											handleFileChange(e);
											field.onChange(e.target.files);
										}}
									/>
								</FormControl>
								{imageError && (
									<p className="text-red-500 text-sm">{imageError}</p>
								)}
								<FormMessage />
							</FormItem>
						)}
					/>
					{image && (
						<img
							src={image}
							alt="Preview"
							style={{ objectFit: "cover" }}
						/>
					)}
					<Button
						disabled={isSubmitting}
						type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
}
