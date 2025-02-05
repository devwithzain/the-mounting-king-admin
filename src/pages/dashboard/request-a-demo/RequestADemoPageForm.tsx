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
import Heading from "@/components/heading";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRequestServicesColumnProps } from "@/types";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import getRequestService from "@/actions/get-requestService";
import { requestServicesFormSchema, TrequestServiceFormData } from "@/schemas";
import { format } from "date-fns";

export default function RequestADemoPageForm() {
	const { id } = useParams();
	const router = useNavigate();
	const [open, setOpen] = useState(false);
	const [requestServices, setRequestServices] =
		useState<TRequestServicesColumnProps | null>(null);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				if (id) {
					const response = await getRequestService(id);
					setRequestServices(response.data);
				}
			} catch (err) {
				console.error("Error fetching products:", err);
			}
		};
		fetchServices();
	}, [id]);

	const formatedData = requestServices
		? {
				id: requestServices.id,
				service_title: requestServices.service_title,
				service_description: requestServices.service_description,
				steps: requestServices.steps,
				created_at: format(
					requestServices.created_at ?? new Date(),
					"MMMM do, yyyy",
				),
		  }
		: null;

	const form = useForm<TrequestServiceFormData>({
		resolver: zodResolver(requestServicesFormSchema),
		defaultValues: formatedData || {
			service_title: "",
			service_description: "",
			steps: [
				{
					step_title: "",
					step_description: "",
					options: [
						{
							size: "",
							time: 0,
							price: 0.0,
						},
					],
				},
			],
		},
	});

	useEffect(() => {
		if (requestServices) {
			form.reset({
				service_title: requestServices.service_title,
				service_description: requestServices.service_description,
				steps: requestServices.steps,
			});
		}
	}, [requestServices, form.reset]);

	const { fields: stepFields, append: appendStep } = useFieldArray({
		control: form.control,
		name: "steps",
	});

	const {
		formState: { isSubmitting },
	} = form;

	const onSubmits = async (data: TrequestServiceFormData) => {
		try {
			const formattedData = {
				...data,
				steps: data.steps.map((step) => ({
					...step,
					options: step.options.map((option) => ({
						...option,
						time: Number(option.time),
						price: Number(option.price),
					})),
				})),
			};

			if (id) {
				await axios.post(
					`https://themountingking.com/backend/api/requestService/${id}`,
					formattedData,
				);
			} else {
				await axios.post(
					`https://themountingking.com/backend/api/requestService`,
					formattedData,
				);
			}
			router(`/dashboard/request-a-demo`);
			router(0);
			toast.success(id ? "Service updated." : "Service created.");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	const onDelete = async () => {
		try {
			if (id) {
				await axios.delete(
					`https://themountingking.com/backend/api/requestService/${id}`,
				);
				router(`/dashboard/request-a-demo`);
				router(0);
				toast.success("Service deleted");
			}
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
			<div className="flex items-center justify-between p-4">
				<Heading
					title={id ? "Edit a service" : "Create service"}
					description={id ? "Edit a service" : "Add a new service"}
				/>
				{id && (
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
					className="space-y-4 w-full px-4">
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
																		type="number"
																		placeholder="Time"
																		{...field}
																		value={field.value || ""}
																		onChange={(e) =>
																			field.onChange(e.target.valueAsNumber)
																		}
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
																		type="number"
																		step="0.01"
																		placeholder="Price"
																		{...field}
																		value={field.value || ""}
																		onChange={(e) =>
																			field.onChange(e.target.valueAsNumber)
																		}
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
														{ size: "", time: 0, price: 0.0 },
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
														options: [{ size: "", time: 0, price: 0.0 }],
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
						{id ? "Save changes" : "Create"}
					</Button>
				</form>
			</Form>
		</>
	);
}
