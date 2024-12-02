import Link from "next/link";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default async function App() {
	return (
		<div className="w-full p-4 flex gap-2">
			<Sidebar />
			<div className="w-[82%] h-[97vh] ml-auto">
				<Navbar />
				<div className="w-full flex flex-col justify-between">
					<div className="w-full flex flex-col gap-5">
						<div className="w-full flex items-center gap-4">
							<div className="w-full px-5 py-8 rounded-lg bg-[#BBB0D2] cursor-pointer">
								<Link
									className="text-[24px] font-medium uppercase text-[#081226] leading-tight tracking-tight"
									href="/products">
									Add Product
								</Link>
							</div>
							<div className="w-full px-5 py-8 rounded-lg bg-[#BBB0D2] cursor-pointer">
								<Link
									className="text-[24px] font-medium uppercase text-[#081226] leading-tight tracking-tight"
									href="/category">
									Add Category
								</Link>
							</div>
						</div>
						<div className="w-full px-5 py-8 rounded-lg bg-[#BBB0D2] cursor-pointer">
							<Link
								className="text-[24px] font-medium uppercase text-[#081226] leading-tight tracking-tight"
								href="/subcategory">
								Add Sub Category
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
