import prismadb from "@/lib/prisma";
import ServiceForm from "./components/service-from";

export default async function ServicePage({
	params,
}: {
	params: Promise<{ bookId: bigint }>;
}) {
	const id = (await params).bookId;
	const initialData =
		id && !isNaN(Number(id))
			? await prismadb.table_slot.findUnique({
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
