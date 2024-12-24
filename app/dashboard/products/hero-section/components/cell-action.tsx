"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TproductHeroColumnProps } from "@/types";
import { Edit, MoreHorizontal } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CellAction({
	data,
}: {
	data: TproductHeroColumnProps;
}) {
	const router = useRouter();
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						className="flex items-center gap-x-2"
						onClick={() =>
							router.push(`/dashboard/products/hero-section/${data.id}`)
						}>
						<Edit className="w-4 h-4" />
						Edit
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
