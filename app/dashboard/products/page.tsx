import { format } from "date-fns";
import prismadb from "@/lib/prisma";
import Heading from "@/components/heading";
import { TproductsColumnProps } from "@/types";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./products-section/components/columns";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function ServicesPage() {
	const productsData = await prismadb.products.findMany();
	const productHeroData = await prismadb.product_hero.findMany();
	const formatedService: TproductsColumnProps[] = productsData.map(
		(service) => ({
			id: service.id,
			title: service.title,
			createdAt: format(service.created_at ?? new Date(), "MMMM do, yyyy"),
		}),
	);
	const formatedHero: TproductsColumnProps[] = productHeroData.map(
		(service) => ({
			id: service.id,
			title: service.title,
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
							title={`Products Page`}
							description="Manage Products Page content for your website."
						/>
					</div>
					<Separator />
					<div className="flex gap-4 flex-col">
						<Heading
							title={`Hero Section Content`}
							description="Manage Hero section content for your products page."
						/>
						<DataTable
							columns={columns}
							data={formatedHero}
							searchKey="title"
						/>
					</div>
					<div className="flex gap-4 flex-col">
						<Heading
							title={`Product Section Content`}
							description="Manage Product section content for your products page."
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
