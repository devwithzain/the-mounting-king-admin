import { TotalSales } from "@/components/sales";
import { TotalOrders } from "@/components/orders";
import { ServiceChart } from "@/components/service-chart";
import { TotalProducts } from "@/components/total-products";
import { UserChart } from "@/components/user-chart";
import { useEffect, useState } from "react";
import { TuserProps } from "@/types";
import getUsers from "@/actions/get-users";
import { format } from "date-fns";
import { columns } from "@/container/user/columns";

export default function Dashboard() {
	const [users, setUsers] = useState<TuserProps[]>([]);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await getUsers();
				setUsers(response);
			} catch (err) {
				console.error("Error fetching users:", err);
			}
		};
		fetchServices();
	}, []);

	const formatedProduct = users.slice(0, 5).map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		image: user.image,
		created_at: format(user.created_at ?? new Date(), "MMMM do, yyyy"),
	}));
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full justify-between">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="rounded-xl">
					<TotalProducts />
				</div>
				<div className="rounded-xl">
					<TotalSales />
				</div>
				<div className="rounded-xl">
					<TotalOrders />
				</div>
			</div>
			<div className="w-full flex gap-4 rounded-xl h-full">
				<div className="flex-1">
					<ServiceChart />
				</div>
				<div className="flex-1">
					<UserChart
						columns={columns}
						data={formatedProduct}
					/>
				</div>
			</div>
		</div>
	);
}
