import prismadb from "@/lib/prisma";
import ServiceForm from "./components/service-from";

export default async function ServicePage({
	params,
}: {
	params: Promise<{ advantageId: bigint }>;
}) {
	const id = (await params).advantageId;
	const initialData =
		id && !isNaN(Number(id))
			? await prismadb.advantage.findUnique({
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
