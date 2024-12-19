"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { request_services } from "@prisma/client";
import AlertModal from "@/components/alert-modal";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { requestServicesFormSchema, TrequestServiceFormData } from "@/schemas";
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
	initialData: request_services;
}) {
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<TrequestServiceFormData>({
		resolver: zodResolver(requestServicesFormSchema),
		defaultValues: {
			service_title: initialData?.service_title || "",
			service_description: initialData?.service_description || "",
			steps: initialData?.step || [
				{
					step_title: initialData?.service_description || "",
					step_description: initialData?.service_description || "",
					options: [
						{
							size: initialData?.service_description || "",
							time: initialData?.service_description,
							price: 0,
						},
					],
				},
			],
		},
	});

	const { fields: stepFields, append: appendStep } = useFieldArray({
		control: form.control,
		name: "steps",
	});

	const {
		formState: { isSubmitting },
	} = form;

	const onSubmits = async (data: TrequestServiceFormData) => {
		try {
			if (initialData) {
				await axios.put(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/requestServices/${params.serviceId}`,
					data,
				);
			} else {
				await axios.post(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/requestServices`,
					data,
				);
			}
			router.push(`/dashboard/request-a-demo/service-section`);
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
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/requestService/${params.serviceId}`,
			);
			router.push(`/dashboard/request-a-demo/service-section`);
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
					title={initialData ? "Edit a service" : "Create service"}
					description={initialData ? "Edit a service" : "Add a new service"}
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
						name="service_title"
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
						name="service_description"
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

					{stepFields.map((step, index) => (
						<div
							key={step.id}
							className="space-y-4">
							<h3>Steps</h3>
							<FormField
								control={form.control}
								name={`steps.${index}.step_title`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Step Title</FormLabel>
										<FormControl>
											<Input
												placeholder="Step Title"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`steps.${index}.step_description`}
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
								name={`steps.${index}.options`}
								render={() => (
									<div className="w-full flex flex-col gap-2">
										<h4>Options</h4>
										{form
											.watch(`steps.${index}.options`)
											.map((_, optionIndex) => (
												<div
													key={optionIndex}
													className="w-full flex items-center justify-between gap-4">
													<FormField
														control={form.control}
														name={`steps.${index}.options.${optionIndex}.size`}
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
														name={`steps.${index}.options.${optionIndex}.time`}
														render={({ field }) => (
															<FormItem className="w-full">
																<FormLabel>Time</FormLabel>
																<FormControl>
																	<Input
																		placeholder="Time"
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name={`steps.${index}.options.${optionIndex}.price`}
														render={({ field }) => (
															<FormItem className="w-full">
																<FormLabel>Price</FormLabel>
																<FormControl>
																	<Input
																		placeholder="Price"
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
											))}
										<div className="w-full flex items-end justify-end pt-4 gap-4">
											<Button
												type="button"
												variant="outline"
												onClick={() =>
													form.setValue(`steps.${index}.options`, [
														...form.getValues(`steps.${index}.options`),
														{ size: "", time: 0, price: 0 },
													])
												}>
												Add Option
											</Button>
											<Button
												type="button"
												variant="outline"
												onClick={() =>
													appendStep({
														step_title: "",
														step_description: "",
														options: [{ size: "", time: 0, price: 0 }],
													})
												}>
												Add Step
											</Button>
										</div>
									</div>
								)}
							/>
						</div>
					))}
					<Separator />
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
