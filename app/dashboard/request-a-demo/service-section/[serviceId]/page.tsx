import prismadb from "@/lib/prisma";
import ServiceForm from "./components/service-from";

export default async function ServicePage({
	params,
}: {
	params: Promise<{ serviceId: bigint }>;
}) {
	const id = (await params).serviceId;
	const initialData =
		id && !isNaN(Number(id))
			? await prismadb.request_services.findUnique({
					where: {
						id: BigInt(id),
					},
					include: {
						request_services_steps: {
							include: {
								request_services_options: true,
							},
						},
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
