import prismadb from "@/lib/prisma";
import ServiceForm from "./components/service-from";

export default async function ServicePage({
	params,
}: {
	params: Promise<{ productId: bigint }>;
}) {
	const id = (await params).productId;
	const initialData =
		id && !isNaN(Number(id))
			? await prismadb.products.findUnique({
					where: {
						id: BigInt(id),
					},
			  })
			: null;

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-8 p-8 pt-6">
				<ServiceForm initialData={initialData} />
			</div>
		</div>
	);
}
