import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	const location = useLocation();

	return (
		<SidebarGroup>
			<SidebarGroupLabel className="text-[16px] font-medium leading-tight pb-4 text-black">
				Navigation
			</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => {
					const isActive =
						location.pathname === item.url ||
						item.items?.some((subItem) => location.pathname === subItem.url);

					return (
						<Collapsible
							key={item.title}
							asChild
							defaultOpen={isActive}
							className="group/collapsible">
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<Link to={item.url}>
										<SidebarMenuButton
											className={`w-full ${
												location.pathname === item.url
													? "dark:bg-[#ffffff10]  bg-[#00000010] text-black dark:text-white"
													: ""
											}`}
											tooltip={item.title}>
											{item.icon && <item.icon />}
											{item.title}
											{item.items && (
												<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											)}
										</SidebarMenuButton>
									</Link>
								</CollapsibleTrigger>
								{item.items && (
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild>
														<a
															href={subItem.url}
															className={
																location.pathname === subItem.url
																	? "dark:bg-[#ffffff10] bg-[#ffffff05]"
																	: ""
															}>
															<span>{subItem.title}</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								)}
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
