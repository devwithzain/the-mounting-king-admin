import { format } from "date-fns";
import Heading from "@/components/heading";
import { TemployeesColumnProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import getEmployees from "@/actions/get-employees";
import { columns } from "@/container/employees/columns";

export default function EmployeePage() {
	const router = useNavigate();
	const [services, setServices] = useState<TemployeesColumnProps[]>([]);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await getEmployees();
				setServices(response.data);
			} catch (err) {
				console.error("Error fetching services:", err);
			}
		};
		fetchServices();
	}, []);

	const formatedServices = services.map((service) => ({
		id: service.id,
		name: service.name,
		email: service.email,
		address: service.address,
		phone_number: service.phone_number,
		state: service.state,
		created_at: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
	}));

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex items-center justify-between">
				<Heading
					title={`Employees (${formatedServices.length})`}
					description="Manage Employee."
				/>
				<Button
					className="flex items-center gap-x-2"
					onClick={() => router(`/dashboard/employees/new`)}>
					<Plus className="w-4 h-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<div className="flex gap-4 flex-col">
				<DataTable
					columns={columns}
					data={formatedServices}
					searchKey="title"
				/>
			</div>
		</div>
	);
}
