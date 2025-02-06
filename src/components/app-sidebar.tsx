import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { TuserProps } from "@/types";
import { sideBarItem } from "@/constants";
import { getToken } from "@/lib/get-token";
import { useEffect, useState } from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { getUserData } from "@/actions/get-user";
import { TeamSwitcher } from "@/components/team-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const token = getToken();
	const [user, setUser] = useState<TuserProps>();

	useEffect(() => {
		const fetchUserData = async () => {
			const userData = await getUserData(token);
			setUser(userData);
		};
		fetchUserData();
	});
	return (
		<Sidebar
			collapsible="icon"
			{...props}>
			<SidebarHeader>
				<TeamSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={sideBarItem.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user ?? { name: "", email: "" }} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
