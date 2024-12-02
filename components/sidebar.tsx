"use client";
import Link from "next/link";
import { sideBarItem } from "@/constants";
import { FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const pathName = usePathname();
	return (
		<div className="w-[17%] rounded-lg bg-[#BBB0D2] py-6 px-4 h-[97%] fixed">
			<div className="flex flex-col gap-2">
				<Link
					href="/"
					className="flex items-center gap-1 justify-center w-full">
					<h1 className="text-[24px] font-semibold uppercase text-[#081226] ">
						The Mounting King
					</h1>
				</Link>
				<hr className="bg-black text-black w-full" />
				<h1 className="text-[#081226] text-[16px]  uppercase font-medium text-left w-full">
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
								className={`transition-all duration-200 ease-linear py-2 px-4 rounded-lg cursor-pointer w-full flex items-center gap-2 group-hover:bg-[#081226] ${
									pathName === item.href ? "bg-[#081226]" : ""
								}`}>
								<div
									className={`text-[#081226] group-hover:text-white  text-[22px] ${
										pathName === item.href ? "text-white" : ""
									}`}>
									{item.icon}
								</div>
								<h1
									className={`text-[#081226] group-hover:text-white  ${
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
						<div className="transition-all duration-200 ease-linear py-2 px-4 rounded-lg cursor-pointer w-full flex items-center gap-2 group-hover:bg-[#081226]">
							<FiLogOut
								size={22}
								className="group-hover:text-white text-[#081226] "
							/>
							<h1 className="group-hover:text-white text-[#081226] ">Logout</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
