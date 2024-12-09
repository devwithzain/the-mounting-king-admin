import Link from "next/link";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { LuArrowLeftRight, LuPackageSearch } from "react-icons/lu";
import { BiBookOpen } from "react-icons/bi";

export default async function Dashboard() {
	return (
		<div className="w-full p-4 flex gap-2">
			<Sidebar />
			<div className="w-[82%] h-[97vh] ml-auto">
				<Navbar />
				<div className="w-full grid grid-cols-3 gap-6">
					<div className="w-full h-[200px] px-5 py-8 rounded-lg bg-[#3920ba] cursor-pointer flex flex-col justify-between">
						<div className="w-full flex items-center justify-between">
							<Link
								className="text-[24px] font-medium text-white leading-tight tracking-tight"
								href="/products">
								Total Revenue
							</Link>
							<BiBookOpen
								className="text-white"
								size={30}
							/>
						</div>
						<Link
							className="text-[24px] font-medium text-white leading-tight tracking-tight"
							href="/products">
							$100.00
						</Link>
					</div>
					<div className="w-full h-[200px] px-5 py-8 rounded-lg bg-[#3920ba] cursor-pointer flex flex-col justify-between">
						<div className="w-full flex items-center justify-between">
							<Link
								className="text-[24px] font-medium text-white leading-tight tracking-tight"
								href="/category">
								Products
							</Link>
							<LuPackageSearch
								className="text-white"
								size={30}
							/>
						</div>
						<Link
							className="text-[24px] font-medium text-white leading-tight tracking-tight"
							href="/products">
							122
						</Link>
					</div>
					<div className="w-full h-[200px] px-5 py-8 rounded-lg bg-[#3920ba] cursor-pointer flex flex-col justify-between">
						<div className="flex items-center justify-between">
							<Link
								className="text-[24px] font-medium text-white leading-tight tracking-tight"
								href="/subcategory">
								Orders
							</Link>
							<LuArrowLeftRight
								className="text-white"
								size={30}
							/>
						</div>
						<Link
							className="text-[24px] font-medium uppercase text-white leading-tight tracking-tight"
							href="/products">
							21
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
