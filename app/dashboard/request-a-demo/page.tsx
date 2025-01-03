import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import Heading from "@/components/heading";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { columns } from "../request-a-demo/hero-section/components/columns";
import { TRequestHeroColumnProps, TRequestServicesColumnProps } from "@/types";
import { columns as serviceColumns } from "../request-a-demo/service-section/components/columns";

export default async function RequestPage() {
	const data = await prismadb.request_hero.findMany();
	const servicesData = await prismadb.request_services.findMany({
		include: {
			request_services_steps: true,
		},
	});
	const formatedHero: TRequestHeroColumnProps[] = data.map((service) => ({
		id: service.id,
		title: service.title,
		createdAt: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
	}));
	const formatedService: TRequestServicesColumnProps[] = servicesData.map(
		(service) => ({
			id: service.id,
			title: service.service_title,
			createdAt: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
		}),
	);
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>
				<Navbar />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<div className="flex items-center justify-between">
						<Heading
							title={`Request A Demo Page`}
							description="Manage Request A Demo Page content for your website."
						/>
					</div>
					<Separator />
					<div className="flex gap-4 flex-col">
						<Heading
							title={`Hero Section Content`}
							description="Manage Hero section content for your request a demo page."
						/>
						<DataTable
							columns={columns}
							data={formatedHero}
							searchKey="title"
						/>
					</div>
					<Separator />
					<div className="flex gap-4 flex-col">
						<Heading
							title={`Service Section Content`}
							description="Manage Service section content for your request a demo page."
						/>
						<DataTable
							columns={serviceColumns}
							data={formatedService}
							searchKey="title"
						/>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
