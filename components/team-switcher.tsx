"use client";

import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { logo } from "@/public";

export function TeamSwitcher() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg">
								<Image
									src={logo}
									width={150}
									height={150}
									alt="Mounting King"
								/>
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									The Mounting King
								</span>
								<span className="truncate text-xs">Admin Dashboard</span>
							</div>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
