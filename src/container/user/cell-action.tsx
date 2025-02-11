import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { TuserProps } from "@/types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/alert-modal";
import { MoreHorizontal, Trash } from "lucide-react";

export default function CellAction({ data }: { data: TuserProps }) {
	const router = useNavigate();
	const [open, setOpen] = useState(false);

	const onDelete = async () => {
		try {
			await axios.delete(`http://127.0.0.1:8000/api/deleteUser/${data.id}`);
			toast.success("User deleted.");
			router(0);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		} finally {
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
						onClick={() => setOpen(true)}>
						<Trash className="w-4 h-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
