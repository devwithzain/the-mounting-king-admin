import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import ServiceClient from "./components/client";
import { TRequestServicesColumnProps } from "@/types";

export default async function ServiceSectionPage() {
	const services = await prismadb.request_services.findMany({
		include: {
			request_services_steps: {
				include: {
					request_services_options: true,
				},
			},
		},
	});
	const formatedService: TRequestServicesColumnProps[] = services.map(
		(service) => ({
			id: Number(service.id),
			title: service.service_title,
			description: service.service_description,
			steps: service.request_services_steps.map((step) => ({
				step_title: step.step_title,
				step_description: step.step_description,
				options: step.request_services_options.map((option) => ({
					size: option.size,
					time: option.time,
					price: Number(option.price),
				})),
			})),
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
