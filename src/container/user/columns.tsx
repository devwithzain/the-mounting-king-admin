import CellAction from "./cell-action";
import { ArrowUpDown } from "lucide-react";
import { TuserProps } from "@/types";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TuserProps>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "role",
		header: "Role",
	},
	{
		accessorKey: "created_at",
		header: "Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
