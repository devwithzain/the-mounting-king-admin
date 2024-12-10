import {
	AudioWaveform,
	Command,
	GalleryVerticalEnd,
	Settings2,
	SquareTerminal,
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
			icon: SquareTerminal,
			isActive: true,
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
			icon: SquareTerminal,
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
			icon: SquareTerminal,
			items: [
				{
					title: "Hero Section",
					url: "/dashboard/home/hero-section",
				},
				{
					title: "Advantage Section",
					url: "/dashboard/home/advantage-section",
				},
				{
					title: "Service Section",
					url: "/dashboard/home/service-section",
				},
			],
		},
		{
			title: "Service Detail Page",
			url: "/dashboard/service-detail",
			icon: SquareTerminal,
			items: [
				{
					title: "Hero Section",
					url: "/dashboard/service-detail/hero-section",
				},
				{
					title: "Service Section",
					url: "/dashboard/service-detail/about-section",
				},
				{
					title: "Advantage Section",
					url: "/dashboard/service-detail/advantage-section",
				},
			],
		},
		{
			title: "Products Page",
			url: "/dashboard/products",
			icon: SquareTerminal,
			items: [
				{
					title: "Hero Section",
					url: "/dashboard/home/hero-section",
				},
				{
					title: "Products Section",
					url: "/dashboard/home/advantage-section",
				},
			],
		},
		{
			title: "Request A Demo Page",
			url: "/dashboard/request-a-demo",
			icon: SquareTerminal,
			items: [
				{
					title: "Hero Section",
					url: "/dashboard/request-a-demo/hero-section",
				},
				{
					title: "Form One",
					url: "/dashboard/request-a-demo/form-one",
				},
			],
		},
		{
			title: "Orders",
			url: "/dashboard/orders",
			icon: Settings2,
		},
	],
};
