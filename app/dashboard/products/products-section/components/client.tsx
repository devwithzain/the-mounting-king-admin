"use client";

import { Plus } from "lucide-react";
import { columns } from "./columns";
import Heading from "@/components/heading";
import { useRouter } from "next/navigation";
import { TproductsColumnProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

export default function ServiceClient({
	data,
}: {
	data: TproductsColumnProps[];
}) {
	const router = useRouter();
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Product Section (${data.length})`}
					description="Manage Product section content for your product page."
				/>
				<Button
					className="flex items-center gap-x-2"
					onClick={() =>
						router.push(`/dashboard/products/products-section/new`)
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
