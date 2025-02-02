import { Plus } from "lucide-react";
import { columns } from "./columns";
import Heading from "@/components/heading";
import { TproductsColumnProps } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

export default function ProductClient({
	data,
}: {
	data: TproductsColumnProps[];
}) {
	const router = useNavigate();
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Product Section (${data.length})`}
					description="Manage Product section content for your product page."
				/>
				<Button
					className="flex items-center gap-x-2"
					onClick={() => router(`/dashboard/products/new`)}>
					<Plus className="w-4 h-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<DataTable
				columns={columns}
				data={data}
				searchKey="title"
			/>
		</>
	);
}
