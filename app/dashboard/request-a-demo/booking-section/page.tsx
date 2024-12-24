import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import ServiceClient from "./components/client";
import { TRequestBookingColumnProps } from "@/types";

export default async function ServiceSectionPage() {
	const services = await prismadb.table_slot.findMany();
	const formatedService: TRequestBookingColumnProps[] = services.map(
		(service) => ({
			id: Number(service.id),
			title: service.title,
			description: service.description,
			createdAt: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
		}),
	);
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex-col">
				<div className="flex-1 space-y-4 p-1 pt-6">
					<ServiceClient data={formatedService} />
				</div>
			</div>
		</div>
	);
}
