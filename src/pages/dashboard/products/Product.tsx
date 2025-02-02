import { format } from "date-fns";
import Heading from "@/components/heading";
import { TproductsColumnProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import getProducts from "@/actions/get-products";
import { columns } from "@/container/product/products-section/columns";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ServicesPage() {
	const router = useNavigate();
	const [products, setProducts] = useState<TproductsColumnProps[]>([]);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				const response = await getProducts();
				setProducts(response.data);
			} catch (err) {
				console.error("Error fetching products:", err);
			}
		};
		fetchServices();
	}, []);

	const formatedProduct = products.map((service) => ({
		id: service.id,
		title: service.title,
		price: service.price,
		color: service.color,
		size: service.size,
		description: service.description,
		created_at: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
	}));

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex items-center justify-between">
				<Heading
					title={`Products (${formatedProduct.length})`}
					description="Manage Products for your product page."
				/>
				<Button
					className="flex items-center gap-x-2"
					onClick={() => router(`/dashboard/products/new`)}>
					<Plus className="w-4 h-4" />
					Add new
				</Button>
			</div>
			<Separator />
			<div className="flex gap-4 flex-col">
				<DataTable
					columns={columns}
					data={formatedProduct}
					searchKey="title"
				/>
			</div>
		</div>
	);
}
