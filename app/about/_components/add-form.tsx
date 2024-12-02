"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Navbar, Sidebar } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { TsubCategoryProps, subCategorySchema } from "@/schemas";
import getCategories from "@/actions/get-categories";
import { useEffect, useState } from "react";

export default function AddForm() {
	const router = useRouter();
	const [categories, setCategories] = useState();
	useEffect(() => {
		const getCategory = async () => {
			const data = await getCategories();
			setCategories(data);
		};
		getCategory();
	}, []);

	const {
		register,
		reset,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<TsubCategoryProps>({
		resolver: zodResolver(subCategorySchema),
	});

	const onSubmits = async (data: TsubCategoryProps) => {
		await axios
			.post(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/subcategories`,
				data,
			)
			.then((response) => {
				if (response?.data?.success) {
					toast.success(response.data.success);
					reset();
					router.push("/subcategories");
					router.refresh();
				}
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
				if (err.response) {
					toast.error(err.response.data.message);
					reset();
				}
			});
	};
	return (
		<div className="w-full p-4 flex gap-2">
			<Sidebar />
			<div className="w-[82%] h-full ml-auto">
				<Navbar />
				<div className="gap-4 flex flex-col">
					<div className="w-full flex justify-between items-center gap-4">
						<h1 className="text-[40px] text-black  font-medium">
							Sub Category Details
						</h1>
					</div>
					<form
						onSubmit={handleSubmit(onSubmits)}
						className="w-full flex flex-col gap-10">
						<div className="relative w-1/2">
							<select
								{...register("category_id")}
								className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none appearance-none pr-10"
								defaultValue="">
								<option
									value=""
									disabled
									hidden>
									Select a Category
								</option>
								{categories?.data?.map((item) => (
									<option
										key={item.id}
										value={item.id}>
										{item.name}
									</option>
								))}
							</select>
							<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-gray-700"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
							{errors.category_id && (
								<span className="text-red-500">
									{errors.category_id.message}
								</span>
							)}
						</div>
						<div className="relative w-1/2 flex flex-col gap-3">
							<input
								{...register("name")}
								placeholder=" "
								type="text"
								className="peer p-2  pt-6 w-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70"
							/>
							<label className="absolute text-md duration-150 tracking-tight leading-tight  transform -translate-y-3 top-5 z-10 left-0 pl-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
								Name
							</label>
							{errors.name && (
								<span className="text-red-500">{errors.name.message}</span>
							)}
						</div>
						<div className="relative w-1/2">
							<select
								{...register("category_name")}
								className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none appearance-none pr-10"
								defaultValue="">
								<option
									value=""
									disabled
									hidden>
									Select a Category
								</option>
								{categories?.data?.map((item) => (
									<option
										key={item.id}
										value={item.name}>
										{item.name}
									</option>
								))}
							</select>
							<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-gray-700"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
							{errors.category_id && (
								<span className="text-red-500">
									{errors.category_id.message}
								</span>
							)}
						</div>
						<input
							type="submit"
							value={`${isSubmitting ? "Loading..." : "Create"}`}
							className="w-fit text-[17px] cursor-pointer text-white font-medium bg-[#081226] px-4 py-2 rounded-lg"
							disabled={isSubmitting}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
