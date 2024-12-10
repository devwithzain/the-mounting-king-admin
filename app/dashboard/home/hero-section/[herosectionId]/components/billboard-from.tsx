"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { billboardFormSchema, TbillboardFormData } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import AlertModal from "@/components/alert-modal";
import Heading from "@/components/heading";

export default function BillboardForm({
	initialData,
}: {
	initialData: any | null;
}) {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<TbillboardFormData>({
		resolver: zodResolver(billboardFormSchema),
		defaultValues: initialData || {
			label: "",
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const title = initialData ? "Edit a billboard" : "Create billboard";
	const description = initialData ? "Edit a billboard" : "Add a new billboard";
	const action = initialData ? "Save changes" : "Create";
	const toastMessage = initialData
		? "Billboard updated."
		: "Billboard created.";

	const onSubmits = async (data: TbillboardFormData) => {
		try {
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/billboards/${params.billboardId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/billboards`, data);
			}
			router.push(`/dashboard/${params.storeId}/billboards`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	const onDelete = async () => {
		try {
			await axios.delete(
				`/api/${params.storeId}/billboards/${params.billboardId}`,
			);
			router.push(`/dashboard/${params.storeId}/billboards`);
			router.refresh();
			toast.success("Billboard deleted.");
		} catch (error) {
			toast.error(
				"Make sure you remove all categories using this billboard first.",
			);
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
					{/* <FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background Image</FormLabel>
								<FormControl>
									<ImageUpload
										value={
											Array.isArray(field.value)
												? field.value.map((image) => image.url)
												: field.value
												? [field.value]
												: []
										}
										onImageUploads={(urls) => {
											field.onChange(urls.length > 0 ? urls[0] : "");
										}}
										onRemoveImage={() => {
											field.onChange("");
										}}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/> */}
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											placeholder="Billboard label"
											{...field}
										/>
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
