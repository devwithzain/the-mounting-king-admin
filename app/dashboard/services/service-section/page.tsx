import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import { TServicesColumnProps } from "@/types";
import ServiceClient from "./components/client";

export default async function ServiceSectionPage() {
	const services = await prismadb.services.findMany();
	const formatedService: TServicesColumnProps[] = services.map((service) => ({
		id: service.id,
		title: service.title,
		description: service.description,
		createdAt: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
	}));
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex-col">
				<div className="flex-1 space-y-4 p-8 pt-6">
					<ServiceClient data={formatedService} />
				</div>
			</div>
		</div>
	);
}
