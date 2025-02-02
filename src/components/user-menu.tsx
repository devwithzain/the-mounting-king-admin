import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { placeholder } from "@/assets";
import { LuLogOut } from "react-icons/lu";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function UserMenu() {
	const router = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const handleClick = () => {
		Cookies.remove("authToken");
		toast.success("Logged out");
		router("/");
	};
	return (
		<div className="relative">
			<div className="flex items-center gap-2">
				<div className="">
					<img
						className="rounded-full"
						alt="Avatar"
						src={placeholder}
					/>
				</div>
				<h1 className="text-[18px] font-medium text-[#081226] font-Poppins">
					The Mounting King
				</h1>
				<div
					onClick={toggleOpen}
					className={`cursor-pointer transition-all duration-200 ease-linear ${
						isOpen ? "rotate-180" : "rotate-0"
					}`}>
					<MdOutlineKeyboardArrowDown size={30} />
				</div>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-fit bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						<div
							onClick={handleClick}
							className="px-4 py-3 hover:bg-neutral-100 transition font-semibold flex gap-3 items-center font-Poppins leading-tight">
							<LuLogOut size={20} />
							Logout
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
