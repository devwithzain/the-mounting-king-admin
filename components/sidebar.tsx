"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { sideBarItem } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
	const router = useRouter();
	const pathName = usePathname();
	const logOut = () => {
		Cookies.remove("authToken");
		toast.success("Logged out");
		router.push("/");
	};
	return (
		<div className="w-[17%] rounded-lg bg-[#3920ba] py-6 px-4 h-[97%] fixed">
			<div className="flex flex-col gap-2">
				<Link
					href="/"
					className="flex items-center gap-1 justify-center w-full">
					<h1 className="text-[24px] font-semibold uppercase text-white ">
						The Mounting King
					</h1>
				</Link>
				<hr className="bg-black text-black w-full" />
				<h1 className="text-white text-[16px]  uppercase font-medium text-left w-full">
					Main Menu
				</h1>
			</div>
			<div className="w-full flex flex-col justify-between gap-2 py-6">
				<div className="flex flex-col gap-2">
					{sideBarItem.map((item) => (
						<div
							className="group transition-all duration-200 ease-linear"
							key={item.id}>
							<Link
								href={item.href}
								className={`transition-all duration-200 ease-linear py-2 px-4 rounded-lg cursor-pointer w-full flex items-center gap-2 group-hover:bg-white ${
									pathName === item.href ? "bg-[#081226]" : ""
								}`}>
								<div
									className={`text-white group-hover:text-[#081226]  text-[22px] ${
										pathName === item.href ? "text-white" : ""
									}`}>
									{item.icon}
								</div>
								<h1
									className={`text-white group-hover:text-[#081226]  ${
										pathName === item.href ? "text-white" : ""
									}`}>
									{item.title}
								</h1>
							</Link>
						</div>
					))}
				</div>
				<div className="absolute bottom-4 left-0 px-4 w-full flex flex-col gap-2">
					<div className="group transition-all duration-200 ease-linear">
						<div
							className="transition-all duration-200 ease-linear py-2 px-4 rounded-lg cursor-pointer w-full flex items-center gap-2 group-hover:bg-white"
							onClick={() => logOut()}>
							<FiLogOut
								size={22}
								className="group-hover:text-[#081226] text-white "
							/>
							<h1 className="group-hover:text-[#081226] text-white ">Logout</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}