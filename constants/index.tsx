import { IoMdContact } from "react-icons/io";
import { BiHomeAlt } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { GrServices } from "react-icons/gr";
import { PiGitPullRequest } from "react-icons/pi";

export const sideBarItem = [
	{
		id: 1,
		title: "Dashboard",
		href: "/",
		icon: <RxDashboard />,
	},
	{
		id: 2,
		title: "Home",
		href: "/home",
		icon: <BiHomeAlt />,
	},
	{
		id: 3,
		title: "Services",
		href: "/services",
		icon: <GrServices />,
	},
	{
		id: 4,
		title: "About",
		href: "/about",
		icon: <IoMdContact />,
	},
	{
		id: 4,
		title: "Request A Demo",
		href: "/request-a-demo",
		icon: <PiGitPullRequest />,
	},
];
