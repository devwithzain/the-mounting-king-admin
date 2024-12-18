import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import Heading from "@/components/heading";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import { TRequestHeroColumnProps } from "@/types";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { columns } from "../request-a-demo/hero-section/components/columns";

export default async function RequestPage() {
	const data = await prismadb.request_hero.findMany();
	const formatedService: TRequestHeroColumnProps[] = data.map((service) => ({
		id: service.id,
		title: service.title,
		createdAt: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
	}));
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>
				<Navbar />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<div className="flex items-center justify-between">
						<Heading
							title={`Request A Demo Page`}
							description="Manage Request A Demo Page content for your website"
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
							data={formatedService}
							searchKey="title"
						/>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
