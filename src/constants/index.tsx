import {
	AudioWaveform,
	BookOpenCheck,
	Command,
	GalleryVerticalEnd,
	House,
	SendToBack,
	SquareChartGantt,
	Cog,
} from "lucide-react";

export const sideBarItem = {
	user: {
		name: "The Mounting",
		email: "info@mounting.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: House,
		},
		{
			title: "Services",
			url: "/dashboard/services",
			icon: Cog,
		},
		{
			title: "Products",
			url: "/dashboard/products",
			icon: SquareChartGantt,
		},
		{
			title: "Request A Demo Page",
			url: "/dashboard/request-a-demo",
			icon: BookOpenCheck,
		},
		{
			title: "Orders",
			url: "/dashboard/orders",
			icon: SendToBack,
		},
	],
};
