import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
	const pathName = useLocation();
	const pathSegments = pathName.pathname.split("/").filter(Boolean);

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{pathSegments.map((segment: string, index: number) => (
							<BreadcrumbItem key={index}>
								{index < pathSegments.length - 1 ? (
									<BreadcrumbLink
										href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
										{segment.replace(/-/g, " ")}{" "}
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage>{segment.replace(/-/g, " ")}</BreadcrumbPage>
								)}
								{index < pathSegments.length - 1 && (
									<BreadcrumbSeparator>
										<FiChevronRight />
									</BreadcrumbSeparator>
								)}
							</BreadcrumbItem>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="px-4">
				<ModeToggle />
			</div>
		</header>
	);
}
