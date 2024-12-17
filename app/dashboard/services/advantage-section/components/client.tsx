"use client";

import { Plus } from "lucide-react";
import { columns } from "./columns";
import Heading from "@/components/heading";
import { useRouter } from "next/navigation";
import { TadvantageColumnProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

export default function ServiceClient({
	data,
}: {
	data: TadvantageColumnProps[];
}) {
	const router = useRouter();
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Advantage Services (${data.length})`}
					description="Manage Advantage Services for your website."
				/>
				<Button
					className="flex items-center gap-x-2"
					onClick={() =>
						router.push(`/dashboard/services/advantage-section/new`)
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
