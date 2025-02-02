import { format } from "date-fns";
import { useEffect, useState } from "react";
import { TproductsColumnProps } from "@/types";
import getProducts from "@/actions/get-products";
import ProductClient from "@/container/product/products-section/client";

export default function ProductSection() {
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
			<div className="flex-col">
				<div className="flex-1 space-y-4 pt-6">
					<ProductClient data={formatedProduct} />
				</div>
			</div>
		</div>
	);
}
