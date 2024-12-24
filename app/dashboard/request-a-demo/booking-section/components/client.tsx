"use client";

import { Plus } from "lucide-react";
import { columns } from "./columns";
import Heading from "@/components/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TRequestBookingColumnProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

export default function ServiceClient({
	data,
}: {
	data: TRequestBookingColumnProps[];
}) {
	const router = useRouter();
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Slots (${data.length})`}
					description="Manage Slots for your website."
				/>
				<Button
					className="flex items-center gap-x-2"
					onClick={() =>
						router.push(`/dashboard/request-a-demo/booking-section/new`)
					}>
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
