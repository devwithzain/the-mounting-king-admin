"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar, Sidebar } from "@/components";
import getCategories from "@/actions/get-categories";
import getSubCategories from "@/actions/get-subCategories";

export default function AddForm() {
	const router = useRouter();

	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [shortDescription, setShortDescription] = useState("");
	const [longDescription, setLongDescription] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const data = await getCategories();
			setCategories(data);
		};

		const fetchSubCategories = async () => {
			const data = await getSubCategories();
			setSubCategories(data);
		};

		fetchCategories();
		fetchSubCategories();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", name);
		formData.append("category", category);
		formData.append("subCategory", subCategory);
		formData.append("shortDescription", shortDescription);
		formData.append("longDescription", longDescription);

		if (image) {
			formData.append("image", image);
		}

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/products`,
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				},
			);
			if (response?.data?.success) {
				toast.success(response.data.success);
				router.push("/products");
				router.refresh();
			}
			console.error(response);
		} catch (err) {
			console.error(err);
			if (err.response?.data?.message) {
				toast.error(err.response.data.message);
			}
		}
	};

	return (
		<div className="w-full p-4 flex gap-2">
			<Sidebar />
			<div className="w-[82%] h-full ml-auto">
				<Navbar />
				<div className="gap-4 flex flex-col">
					<div className="w-full flex justify-between items-center gap-4">
						<h1 className="text-[40px] text-black  font-semibold">
							Product Details
						</h1>
					</div>
					<form
						onSubmit={handleSubmit}
						className="w-full flex flex-col gap-4">
						<div className="w-full flex items-center gap-2">
							<div className="relative w-full flex flex-col gap-3">
								<div>
									<input
										placeholder="Name"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none"
									/>
								</div>
							</div>
							<div className="relative w-full">
								<select
									value={category}
									onChange={(e) => setCategory(e.target.value)}
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
							</div>
							<div className="relative w-full">
								<select
									value={subCategory}
									onChange={(e) => setSubCategory(e.target.value)}
									className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none appearance-none pr-10"
									defaultValue="">
									<option
										value=""
										disabled
										hidden>
										Select a Sub Category
									</option>
									{subCategories?.data?.map((item) => (
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
							</div>
						</div>
						<div className="w-full flex items-center gap-2">
							<div className="relative w-full">
								<textarea
									value={shortDescription}
									onChange={(e) => setShortDescription(e.target.value)}
									placeholder="Short Description"
									className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none"
								/>
							</div>
						</div>
						<div className="relative w-full">
							<textarea
								value={longDescription}
								onChange={(e) => setLongDescription(e.target.value)}
								placeholder="Long Description"
								className="text-sm p-4 w-full font-light bg-white border-2 placeholder:text-gray-700 rounded-md outline-none"
							/>
						</div>
						<div className="mb-5">
							<label className="block text-sm font-medium text-gray-900">
								Upload File
							</label>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={(e) => setImage(e.target.files?.[0] || null)}
								className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
							/>
						</div>
						<input
							type="submit"
							className="w-fit text-[17px] cursor-pointer text-white font-medium bg-[#081226] px-4 py-2 rounded-lg"
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
