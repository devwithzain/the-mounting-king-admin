import { format } from "date-fns";
import Heading from "@/components/heading";
import { TservicesColumnProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import getServices from "@/actions/get-services";
import { columns } from "@/container/services/columns";

export default function ServicePage() {
	const router = useNavigate();
	const [services, setServices] = useState<TservicesColumnProps[]>([]);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await getServices();
				setServices(response.data);
			} catch (err) {
				console.error("Error fetching services:", err);
			}
		};
		fetchServices();
	}, []);

	const formatedServices = services.map((service) => ({
		id: service.id,
		title: service.title,
		description: service.description,
		short_description: service.short_description,
		image: service.image,
		created_at: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
	}));

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex items-center justify-between">
				<Heading
					title={`Services (${formatedServices.length})`}
					description="Manage Services for your product page."
				/>
				<Button
					className="flex items-center gap-x-2"
					onClick={() => router(`/dashboard/services/new`)}>
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
