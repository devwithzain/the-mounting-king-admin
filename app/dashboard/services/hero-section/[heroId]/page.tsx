import prismadb from "@/lib/prisma";
import ServiceForm from "./components/service-from";

export default async function ServicePage({
	params,
}: {
	params: Promise<{ heroId: bigint }>;
}) {
	const id = (await params).heroId;
	const initialData =
		id && !isNaN(Number(id))
			? await prismadb.service_hero.findUnique({
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
