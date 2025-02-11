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
import { Button } from "@/components/ui/button";
import getEmployee from "@/actions/get-employee";
import AlertModal from "@/components/alert-modal";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { employeesColumnSchema, TemployeesColumnSchema } from "@/schemas";

export default function EmployeeForm() {
	const { id } = useParams();
	const router = useNavigate();
	const [open, setOpen] = useState(false);
	const [services, setServices] = useState<TemployeesColumnSchema | null>(null);

	const form = useForm<TemployeesColumnSchema>({
		resolver: zodResolver(employeesColumnSchema),
		defaultValues: {
			name: "",
			email: "",
			address: "",
			phone_number: "",
			state: "",
		},
	});

	const {
		formState: { isSubmitting },
		reset,
	} = form;

	useEffect(() => {
		const fetchServices = async () => {
			try {
				if (id) {
					const response = await getEmployee(id);
					setServices(response.data);
					reset(response.data);
				}
			} catch (err) {
				console.error("Error fetching services:", err);
			}
		};
		fetchServices();
	}, [id, reset]);

	const initialData = services;
	const action = initialData ? "Save changes" : "Create";
	const title = initialData ? "Edit employee" : "Create employee";
	const description = initialData ? "Edit employee" : "Add a new employee";
	const toastMessage = initialData ? "Employee updated." : "Employee created.";

	const onSubmits = async (data: TemployeesColumnSchema) => {
		try {
			if (initialData) {
				await axios.put(`http://127.0.0.1:8000/api/employee/${id}`, data, {
					headers: {
						"Content-Type": "application/json",
					},
				});
			} else {
				await axios.post(`http://127.0.0.1:8000/api/employee`, data);
			}
			toast.success(toastMessage);
			router(`/dashboard/employees`);
			router(0);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	const onDelete = async () => {
		try {
			await axios.delete(`http://127.0.0.1:8000/api/employee/${id}`);
			router(`/dashboard/employees`);
			router(0);
			toast.success("Employee deleted");
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
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone_number"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input
										placeholder="Phone Number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem>
								<FormLabel>State</FormLabel>
								<FormControl>
									<Input
										placeholder="State"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Address"
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
