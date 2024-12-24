"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import Heading from "@/components/heading";
import { table_slot } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { requestBookingFormSchema, TrequestBookingFormData } from "@/schemas";
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
	initialData: table_slot;
}) {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<TrequestBookingFormData>({
		resolver: zodResolver(requestBookingFormSchema),
		defaultValues: {
			title: initialData?.title || "",
			description: initialData?.description || "",
			days: initialData?.days ? JSON.parse(initialData.days) : [],
			timings: initialData?.timings ? JSON.parse(initialData.timings) : [],
			is_active: initialData?.is_active || false,
		},
	});
	const {
		formState: { isSubmitting },
	} = form;

	const onSubmits = async (data: TrequestBookingFormData) => {
		try {
			if (initialData) {
				await axios.put(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/slot/${params.bookId}`,
					data,
				);
			} else {
				await axios.post(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/slot`,
					data,
				);
			}
			router.push(`/dashboard/request-a-demo/booking-section`);
			router.refresh();
			toast.success(initialData ? "Service updated." : "Service created.");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	const onDelete = async () => {
		try {
			await axios.delete(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/slot/${params.bookId}`,
			);
			router.push(`/dashboard/request-a-demo/booking-section`);
			router.refresh();
			toast.success("Content deleted");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		} finally {
			setOpen(false);
		}
	};

	const toggleActive = async () => {
		try {
			await axios.put(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/slot/${params.bookId}/toggle-active`,
				{ is_active: false },
			);
			router.refresh();
			toast.success("Service status updated");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
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
					title={initialData ? "Edit a service" : "Create service"}
					description={initialData ? "Edit a service" : "Add a new service"}
				/>
				<div className="flex gap-2">
					{initialData && (
						<>
							<Button
								disabled={isSubmitting}
								variant="outline"
								size="sm"
								onClick={toggleActive}>
								Make Inactive
							</Button>
							<Button
								disabled={isSubmitting}
								variant="destructive"
								size="sm"
								onClick={() => setOpen(true)}>
								<Trash className="h-4 w-4" />
							</Button>
						</>
					)}
				</div>
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
						name="days"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Days</FormLabel>
								<FormControl>
									<div className="w-full flex items-center justify-between gap-2">
										{field.value.map((day: string, index: number) => (
											<Input
												key={index}
												placeholder={`Day ${index + 1}`}
												value={day}
												onChange={(e) => {
													const newDays = [...field.value];
													newDays[index] = e.target.value;
													field.onChange(newDays);
												}}
											/>
										))}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="timings"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Timings</FormLabel>
								<FormControl>
									<div className="w-full flex items-center justify-between gap-2">
										{field.value.map((time: string, index: number) => (
											<Input
												key={index}
												placeholder={`Timing ${index + 1}`}
												value={time}
												onChange={(e) => {
													const newTimings = [...field.value];
													newTimings[index] = e.target.value;
													field.onChange(newTimings);
												}}
											/>
										))}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={isSubmitting}
						type="submit">
						{initialData ? "Save changes" : "Create"}
					</Button>
				</form>
			</Form>
		</>
	);
}
