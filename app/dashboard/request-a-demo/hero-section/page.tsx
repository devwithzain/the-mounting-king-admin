import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import { TServicesHeroColumnProps } from "@/types";
import ServiceClient from "./components/client";

export default async function RequestHeroPage() {
	const data = await prismadb.request_hero.findMany();
	const formatedService: TServicesHeroColumnProps[] = data.map((service) => ({
		id: service.id,
		title: service.title,
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
