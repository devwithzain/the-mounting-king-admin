import Navbar from "../../../../components/navbar";
import Sidebar from "../../../../components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>
				<Navbar />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
