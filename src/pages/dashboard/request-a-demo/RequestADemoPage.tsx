import { format } from "date-fns";
import { Plus } from "lucide-react";
import Heading from "@/components/heading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TRequestServicesColumnProps } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/container/request-a-demo/columns";
import getRequestServices from "@/actions/get-requestServices";

export default function RequestADemoPage() {
	const router = useNavigate();
	const [requestServices, setRequestServices] = useState<
		TRequestServicesColumnProps[]
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getRequestServices();
				setRequestServices(response.data);
			} catch (err) {
				console.error("Error fetching products:", err);
			}
		};
		fetchData();
	}, []);

	const formatedData = requestServices.map((service) => ({
		id: service.id,
		service_title: service.service_title,
		service_description: service.service_description,
		steps: service.steps,
		created_at: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
	}));

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-between">
					<Heading
						title={`Request A Demo Page`}
						description="Manage Request A Demo Page content for your website."
					/>
				</div>
				<Button
					className="flex items-center gap-x-2"
					onClick={() => router(`/dashboard/request-a-demo/new`)}>
					<Plus className="w-4 h-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<div className="flex gap-4 flex-col">
				<DataTable
					columns={columns}
					data={formatedData}
					searchKey="title"
				/>
			</div>
		</div>
	);
}
