import Link from "next/link";
import { TcategoriesProps } from "@/types";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import getCategories from "@/actions/get-categories";
import { DeleteButton, EditButton } from "@/components";

export default async function HomePage() {
	// const categories = await getCategories();
	return (
		<div className="w-full p-4 flex gap-2">
			<Sidebar />
			<div className="w-[82%] h-[97vh] ml-auto">
				<Navbar />
				<div className="gap-4 flex flex-col">
					<div className="w-full flex justify-between items-center gap-4">
						<div>
							<h1 className="text-[35px]  font-medium tracking-tighter leading-tight">
								Home Page Content
							</h1>
						</div>
						<Link
							href="/categories/add-new"
							className="text-[14px]  font-semibold bg-[#081226] text-white py-2 px-4 rounded-lg">
							Add New
						</Link>
					</div>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border border-gray-200">
							<thead>
								<tr>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Name
									</th>
									<th className="border border-gray-200 px-4 py-2  text-left">
										Actions
									</th>
								</tr>
							</thead>
							{/* <tbody>
								{categories?.data?.map((item: TcategoriesProps) => (
									<tr key={item.id}>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div>
												<h1 className="text-[15px] text-black font-medium">
													{item.name}
												</h1>
											</div>
										</td>
										<td className="border border-gray-200 px-4 py-2  w-fit">
											<div className="flex items-end justify-end gap-4">
												<EditButton
													id={item.id}
													path={`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/categories`}
													url="categories"
												/>
												<DeleteButton
													id={item.id}
													path={`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/categories`}
												/>
											</div>
										</td>
									</tr>
								))}
							</tbody> */}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
