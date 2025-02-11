import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import Heading from "@/components/heading";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema, TUserProfileProps } from "@/schemas";
import { getToken } from "@/lib/get-token";
import { TuserProps } from "@/types";
import { getUserData } from "@/actions/get-user";

export default function Account() {
	const token = getToken();
	const router = useNavigate();
	const [open, setOpen] = useState(false);
	const [image, setImage] = useState<string>("");
	const [imageError, setImageError] = useState<string>("");
	const [user, setUser] = useState<TuserProps | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const userData = await getUserData(token);
			setUser(userData);
		};
		fetchUserData();
	});
	const formattedUser = user
		? {
				name: user.name,
				email: user.email,
				image: user.image,
		  }
		: null;

	const form = useForm<TUserProfileProps>({
		resolver: zodResolver(userProfileSchema),
		defaultValues: formattedUser || {
			name: "",
			email: "",
			image: "",
		},
	});

	useEffect(() => {
		if (user) {
			form.reset({
				name: user.name,
				email: user.email,
				image: user.image || "",
			});
		}
	}, [user, form.reset]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageError("");
		const file = e.target.files?.[0];

		if (!file) return;

		const allowedTypes = [
			"image/jpeg",
			"image/png",
			"image/jpg",
			"image/gif",
			"image/svg+xml",
		];

		if (!file.type.startsWith("image/")) {
			setImageError("File must be an image");
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
	};

	const {
		formState: { isSubmitting },
	} = form;

	const initialData = formattedUser;
	const toastMessage = initialData && "Profile updated.";

	const onSubmits = async (data: TUserProfileProps) => {
		// if (data.password !== data.confirmPassword) {
		// 	toast.error("Passwords do not match");
		// 	return;
		// }

		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("email", data.email);
		// if (data.password) formData.append("password", data.password);
		if (image) {
			const blob = dataURLtoBlob(image);
			formData.append("image", blob, "profile-image.png");
		}

		try {
			await axios.put(
				`http://127.0.0.1:8000/api/profile/update/"5"`,
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				},
			);
			router(0);
			toast.success(toastMessage);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

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

	const onDelete = async () => {
		try {
			await axios.delete(`http://127.0.0.1:8000/api/user/${user?.id}`);
			router(`/dashboard/profile`);
			router(0);
			toast.success("Profile deleted");
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
					title="Settings"
					description="Edit your details!"
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
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Email"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* <FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Confirm Password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Profile Image</FormLabel>
								<FormControl>
									<Input
										placeholder="Profile Image"
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
							alt="Profile Preview"
							style={{ objectFit: "cover", width: "100px", height: "100px" }}
						/>
					)}
					<Button
						disabled={isSubmitting}
						type="submit">
						Save changes
					</Button>
				</form>
			</Form>
		</>
	);
}
