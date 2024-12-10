import { Sales } from "@/components/sales";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { ServiceChart } from "@/components/service-chart";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>
				<Navbar />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full justify-between">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="rounded-xl">
							<Sales />
						</div>
						<div className="rounded-xl">
							<Sales />
						</div>
						<div className="rounded-xl">
							<Sales />
						</div>
					</div>
					<div className="rounded-xl h-full">
						<ServiceChart />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
