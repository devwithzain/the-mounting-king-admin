"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { advantage } from "@prisma/client";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import {
	servicesAdvantageFormSchema,
	TserviceAdvantageFormData,
} from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/image-upload";
import { LuImagePlus } from "react-icons/lu";

export default function ServiceForm({
	initialData,
}: {
	initialData: advantage | null;
}) {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<TserviceAdvantageFormData>({
		resolver: zodResolver(servicesAdvantageFormSchema),
		defaultValues: initialData || {
			title: "",
			subTitle: "",
			serviceTitle1: "",
			serviceTitle2: "",
			serviceTitle3: "",
			serviceDescription1: "",
			serviceDescription2: "",
			serviceDescription3: "",
			serviceImage1: "",
			serviceImage2: "",
			serviceImage3: "",
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const title = initialData ? "Edit a service" : "Create service";
	const description = initialData ? "Edit a service" : "Add a new service";
	const action = initialData ? "Save changes" : "Create";
	const toastMessage = initialData ? "service updated." : "service created.";

	const onSubmits = async (data: TserviceAdvantageFormData) => {
		try {
			if (initialData) {
				await axios.patch(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/advantage/${params.advantageId}`,
					data,
				);
			} else {
				await axios.post(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/advantage`,
					data,
				);
			}
			router.push(`/dashboard/services/advantage-section`);
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
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/advantage/${params.advantageId}`,
			);
			router.push(`/dashboard/services/advantage-section`);
			router.refresh();
			toast.success("Advantage Service deleted");
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
					className="space-y-6 w-full">
					<div className="w-full flex items-center justify-between gap-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="w-full">
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
							name="subTitle"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Sub Title</FormLabel>
									<FormControl>
										<Input
											placeholder="Sub Title"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full flex items-center justify-between gap-4">
						<FormField
							control={form.control}
							name="serviceTitle1"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Service Title 1</FormLabel>
									<FormControl>
										<Input
											placeholder="Service Title 1"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serviceTitle2"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Service Title 2</FormLabel>
									<FormControl>
										<Input
											placeholder="Service Title 2"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serviceTitle3"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Service Title 3</FormLabel>
									<FormControl>
										<Input
											placeholder="Service Title 3"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full flex items-center justify-between gap-4">
						<FormField
							control={form.control}
							name="serviceDescription1"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Service Description 1</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Service Description 1"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serviceDescription2"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Service Description 2</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Service Description 2"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serviceDescription3"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Service Description 3</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Service Description 3"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="w-full flex items-center justify-center gap-4">
						<FormField
							control={form.control}
							name="serviceImage1"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<label htmlFor="imageUpload">
											<Button
												type="button"
												variant="secondary"
												onClick={() =>
													document.getElementById("imageUpload")?.click()
												}>
												<LuImagePlus className="h-4 w-4 mr-2" />
												Upload an Image
											</Button>
										</label>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serviceImage2"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<label htmlFor="imageUpload">
											<Button
												type="button"
												variant="secondary"
												onClick={() =>
													document.getElementById("imageUpload")?.click()
												}>
												<LuImagePlus className="h-4 w-4 mr-2" />
												Upload an Image
											</Button>
										</label>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="serviceImage3"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl>
										<label htmlFor="imageUpload">
											<Button
												type="button"
												variant="secondary"
												onClick={() =>
													document.getElementById("imageUpload")?.click()
												}>
												<LuImagePlus className="h-4 w-4 mr-2" />
												Upload an Image
											</Button>
										</label>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
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
