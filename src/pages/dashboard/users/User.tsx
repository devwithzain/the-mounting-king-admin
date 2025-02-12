import { format } from "date-fns";
import { TuserProps } from "@/types";
import Heading from "@/components/heading";
import getUsers from "@/actions/get-users";
import { useEffect, useState } from "react";
import { columns } from "@/container/user/columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

export default function User() {
	const [users, setUsers] = useState<TuserProps[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getUsers();
				setUsers(response);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};
		fetchUsers();
	}, []);

	const formatedUsers = (users || []).slice(0, 8).map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		created_at: format(user.created_at ?? new Date(), "MMMM do, yyyy"),
	}));

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex gap-4 flex-col">
				<div className="flex items-center justify-between">
					<Heading
						title={`Users (${formatedUsers.length})`}
						description="Manage Users for your website."
					/>
				</div>
				<Separator />
				<DataTable
					columns={columns}
					data={formatedUsers}
					searchKey="name"
				/>
			</div>
		</div>
	);
}
