"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TadvantageColumnProps } from "@/types";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CellAction({ data }: { data: TadvantageColumnProps }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const onDelete = async () => {
		try {
			await axios.delete(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/advantage/${data.id}`,
			);
			toast.success("Advantage service deleted.");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
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
							router.push(`/dashboard/services/advantage-section/${data.id}`)
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
