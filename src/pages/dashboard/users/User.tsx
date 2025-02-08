import { format } from "date-fns";
import { TuserProps } from "@/types";
import getUsers from "@/actions/get-users";
import { useEffect, useState } from "react";
import { columns } from "@/container/user/columns";
import { DataTable } from "@/components/ui/data-table";

export default function User() {
	const [users, setUsers] = useState<TuserProps[]>([]);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await getUsers();
				setUsers(response.data);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};
		fetchServices();
	}, []);

	const formatedProduct = users.slice(0, 8).map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		created_at: format(user.created_at ?? new Date(), "MMMM do, yyyy"),
	}));

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex gap-4 flex-col">
				<DataTable
					columns={columns}
					data={formatedProduct}
					searchKey="name"
				/>
			</div>
		</div>
	);
}
