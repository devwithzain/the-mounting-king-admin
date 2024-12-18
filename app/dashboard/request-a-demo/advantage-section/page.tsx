import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import { TadvantageColumnProps } from "@/types";
import ServiceClient from "./components/client";

export default async function ServiceSectionPage() {
	const services = await prismadb.advantage.findMany();
	const formatedService: TadvantageColumnProps[] = services.map((service) => ({
		id: service.id,
		title: service.title,
		subTitle: service.subTitle,
		serviceTitle1: service.serviceTitle1,
		serviceTitle2: service.serviceTitle2,
		serviceTitle3: service.serviceTitle3,
		serviceDescription1: service.serviceDescription1,
		serviceDescription2: service.serviceDescription2,
		serviceDescription3: service.serviceDescription3,
		serviceImage1: service.serviceImage1,
		serviceImage2: service.serviceImage2,
		serviceImage3: service.serviceImage3,
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
