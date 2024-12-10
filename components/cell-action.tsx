"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { TBillboardColumnProps } from "@/types";
import AlertModal from "@/components/alert-modal";
import { useRouter, useParams } from "next/navigation";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CellAction({ data }: { data: TBillboardColumnProps }) {
	const router = useRouter();
	const params = useParams();
	const [open, setOpen] = useState(false);

	const onDelete = async () => {
		try {
			await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
			toast.success("Billboard deleted.");
		} catch (err) {
			toast.error(
				"Make sure you remove all categories using this billboard first.",
			);
		} finally {
			router.refresh();
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
			/>
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
							router.push(`/dashboard/${params.storeId}/billboards/${data.id}`)
						}>
						<Edit className="w-4 h-4" />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex items-center gap-x-2"
						onClick={() => setOpen(true)}>
						<Trash className="w-4 h-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
