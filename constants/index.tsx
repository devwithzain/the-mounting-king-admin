import {
	AudioWaveform,
	BookOpenCheck,
	Command,
	GalleryVerticalEnd,
	House,
	LibraryBig,
	SendToBack,
	Server,
	SquareChartGantt,
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
			title: "Home Page",
			url: "/dashboard/home",
			icon: House,
			items: [
				{
					title: "Hero Section",
					url: "/dashboard/home/hero-section",
				},
				{
					title: "Service Section",
					url: "/dashboard/home/service-section",
				},
				{
					title: "About Section",
					url: "/dashboard/home/about-section",
				},
				{
					title: "Advantage Section",
					url: "/dashboard/home/advantage-section",
				},
				{
					title: "Supplied Section",
					url: "/dashboard/home/supplied-section",
				},
				{
					title: "Cta Section",
					url: "/dashboard/home/cta-section",
				},
			],
		},
		{
			title: "About Page",
			url: "/dashboard/about",
			icon: LibraryBig,
			items: [
				{
					title: "Hero Section",
					url: "/dashboard/about/hero-section",
				},
				{
					title: "About Section",
					url: "/dashboard/about/about-section",
				},
				{
					title: "Advantage Section",
					url: "/dashboard/about/advantage-section",
				},
			],
		},
		{
			title: "Service Page",
			url: "/dashboard/service",
			icon: Server,
			items: [
				{
					title: "Hero Section",
					url: "/dashboard/services/hero-section",
				},
				{
					title: "Advantage Section",
					url: "/dashboard/services/advantage-section",
				},
				{
					title: "Service Section",
					url: "/dashboard/services/service-section",
				},
			],
		},
		{
			title: "Products Page",
			url: "/dashboard/products",
			icon: SquareChartGantt,
			items: [
				{
					title: "Hero Section",
					url: "/dashboard/products/hero-section",
				},
				{
					title: "Products Section",
					url: "/dashboard/products/products-section",
				},
			],
		},
		{
			title: "Request A Demo Page",
			url: "/dashboard/request-a-demo",
			icon: BookOpenCheck,
			items: [
				{
					title: "Hero Section",
					url: "/dashboard/request-a-demo/hero-section",
				},
				{
					title: "Services Section",
					url: "/dashboard/request-a-demo/service-section",
				},
				{
					title: "Booking Section",
					url: "/dashboard/request-a-demo/booking-section",
				},
			],
		},
		{
			title: "Orders",
			url: "/dashboard/orders",
			icon: SendToBack,
		},
	],
};
