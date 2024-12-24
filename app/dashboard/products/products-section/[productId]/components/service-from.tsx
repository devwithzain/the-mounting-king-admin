"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import Heading from "@/components/heading";
import { products } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { productsColumnSchema, TproductsColumnProps } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export default function ServiceForm({
	initialData,
}: {
	initialData: products | null;
}) {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [images, setImages] = useState<string[]>([]);
	const [imageError, setImageError] = useState<string>("");

	const form = useForm<TproductsColumnProps>({
		resolver: zodResolver(productsColumnSchema),
		defaultValues: {
			size: initialData?.size || "",
			price: initialData?.price || "",
			color: initialData?.color || "",
			title: initialData?.title || "",
			images: initialData?.images || "",
			category: initialData?.category || "",
			description: initialData?.description || "",
			shortDescription: initialData?.shortDescription || "",
		},
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageError("");
		const files = Array.from(e.target.files || []);
		const allowedTypes = [
			"image/jpeg",
			"image/png",
			"image/jpg",
			"image/gif",
			"image/svg+xml",
		];

		for (const file of files) {
			if (!file.type.startsWith("image/")) {
				setImageError("Each file must be an image");
				return;
			}

			if (!allowedTypes.includes(file.type)) {
				setImageError("Only jpeg, png, jpg, gif, svg images are allowed");
				return;
			}

			if (file.size > 5 * 1024 * 1024) {
				// 5MB limit
				setImageError("Image size should be less than 5MB");
				return;
			}
		}

		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				const base64 = reader.result as string;
				setImages((prevImages) => [...prevImages, base64]);
			};
			reader.readAsDataURL(file);
		});
	};

	const {
		formState: { isSubmitting },
	} = form;

	const action = initialData ? "Save changes" : "Create";
	const title = initialData ? "Edit content" : "Create content";
	const description = initialData ? "Edit content" : "Add a new content";
	const toastMessage = initialData ? "content updated." : "content created.";

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

	const onSubmits = async (data: TproductsColumnProps) => {
		if (images.length === 0) {
			setImageError("At least one image is required");
			return;
		}
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("shortDescription", data.shortDescription);
		formData.append("description", data.description);
		formData.append("category", data.category);
		formData.append("price", data.price);
		formData.append("color", data.color);
		formData.append("size", data.size);
		images.forEach((image, index) => {
			const blob = dataURLtoBlob(image);
			formData.append(`images[${index}]`, blob, `image-${index}.png`);
		});

		try {
			if (initialData) {
				await axios.put(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/product/${params.productId}`,
					formData,
					{
						headers: { "Content-Type": "multipart/form-data" },
					},
				);
			} else {
				await axios.post(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/product`,
					formData,
					{
						headers: { "Content-Type": "multipart/form-data" },
					},
				);
			}
			router.push(`/dashboard/products/products-section`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	const onDelete = async () => {
		try {
			await axios.delete(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/product/${params.productId}`,
			);
			router.push(`/dashboard/products/products-section`);
			router.refresh();
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
			<div className="flex items-center justify-between">
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
					className="space-y-4 w-full">
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
						name="shortDescription"
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
					<div className="w-full flex items-center justify-between gap-2">
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Input
											placeholder="Category"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											placeholder="Price"
											type="number"
											min="0"
											step="0.01"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="size"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Size</FormLabel>
									<FormControl>
										<Input
											placeholder="Size"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="color"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Color</FormLabel>
									<FormControl>
										<Input
											placeholder="Color"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Image</FormLabel>
								<FormControl>
									<Input
										placeholder="Image"
										type="file"
										multiple
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
					{images.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt={`Preview ${index}`}
							width={100}
							height={100}
							style={{ objectFit: "cover" }}
						/>
					))}
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
