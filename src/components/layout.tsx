import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "@/components";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout() {
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>
				<Navbar />
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
