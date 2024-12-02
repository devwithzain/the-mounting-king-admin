"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ImageUpload() {
	const [previews, setPreviews] = useState<string[]>([]);
	const [images, setImages] = useState<File[] | File | null>(null);

	const onSubmitUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		if (Array.isArray(images)) {
			images.forEach((image) => formData.append("images[]", image));
		} else if (images) {
			formData.append("images[]", images);
		}

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/images`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			toast.success(response.data.message);
		} catch (err) {
			console.error(err);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const filesArray = Array.from(files);

			setImages(filesArray.length === 1 ? filesArray[0] : filesArray);

			const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
			setPreviews(previewUrls);
		}
	};

	useEffect(() => {
		return () => {
			previews.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [previews]);

	return (
		<div>
			<form>
				<div className="flex flex-col items-center">
					<input
						type="file"
						multiple
						onChange={handleImageChange}
					/>
				</div>
				<div className="w-full flex flex-wrap gap-3">
					{previews.map((preview, index) => (
						<div
							key={index}
							className="w-24 h-24 relative">
							<Image
								src={preview}
								alt="Preview"
								fill
								className="object-cover"
							/>
						</div>
					))}
				</div>
				<button
					type="submit"
					className="btn btn-primary"
					onClick={onSubmitUpload}>
					Upload Images
				</button>
			</form>
		</div>
	);
}
