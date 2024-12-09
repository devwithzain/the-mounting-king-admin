import { IoMdContact } from "react-icons/io";
import { BiHomeAlt } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { GrServices } from "react-icons/gr";
import { RiProductHuntLine } from "react-icons/ri";
import { PiGitPullRequest } from "react-icons/pi";

export const sideBarItem = [
	{
		id: 1,
		title: "Dashboard",
		href: "/dashboard",
		icon: <RxDashboard />,
	},
	{
		id: 2,
		title: "Home Page",
		href: "/home",
		icon: <BiHomeAlt />,
	},
	{
		id: 3,
		title: "Services Page",
		href: "/services",
		icon: <GrServices />,
	},
	{
		id: 4,
		title: "About Page",
		href: "/about",
		icon: <IoMdContact />,
	},
	{
		id: 4,
		title: "Products Page",
		href: "/products",
		icon: <RiProductHuntLine />,
	},
	{
		id: 5,
		title: "Request A Demo Page",
		href: "/request-a-demo",
		icon: <PiGitPullRequest />,
	},
	{
		id: 6,
		title: "Contact Us",
		href: "/contact-us",
		icon: <IoMdContact />,
	},
];
