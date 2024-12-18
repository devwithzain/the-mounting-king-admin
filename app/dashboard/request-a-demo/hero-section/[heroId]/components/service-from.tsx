"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import Heading from "@/components/heading";
import { service_hero } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { requestHeroFormSchema, TrequestHeroFormData } from "@/schemas";
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
	initialData: service_hero | null;
}) {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<TrequestHeroFormData>({
		resolver: zodResolver(requestHeroFormSchema),
		defaultValues: initialData || {
			title: "",
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const title = initialData ? "Edit content" : "Create content";
	const description = initialData ? "Edit content" : "Add a new content";
	const action = initialData ? "Save changes" : "Create";
	const toastMessage = initialData ? "content updated." : "content created.";

	const onSubmits = async (data: TrequestHeroFormData) => {
		try {
			if (initialData) {
				await axios.put(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/serviceRequest/${params.heroId}`,
					data,
				);
			} else {
				await axios.post(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/serviceRequest`,
					data,
				);
			}
			router.push(`/dashboard/request-a-demo/hero-section`);
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
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/serviceRequest/${params.heroId}`,
			);
			router.push(`/dashboard/request-a-demo/hero-section`);
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
