"use client";
import { columns } from "./columns";
import Heading from "@/components/heading";
import { TproductHeroColumnProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

export default function ServiceClient({
	data,
}: {
	data: TproductHeroColumnProps[];
}) {
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Hero Section (${data.length})`}
					description="Manage Hero section content for your product page."
				/>
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
