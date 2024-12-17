"use client";
import { useState, useEffect } from "react";
import { TimageUploadProps } from "@/types";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

export default function ImageUpload({
	value = "",
	onImageUploads,
	onRemoveImage,
}: TimageUploadProps) {
	const [mediaUrl, setMediaUrl] = useState<string>(value);
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		setMediaUrl(value);
	}, [value]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		if (file) {
			setFile(file);
			const objectUrl = URL.createObjectURL(file);
			setMediaUrl(objectUrl);
		}
	};

	const handleUpload = async () => {
		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/advantage`,
				{
					method: "POST",
					body: formData,
					headers: {
						"Accept": "application/json",
						"Content-Type": "multipart/form-data",
					},
				},
			);
			const result = await response.json();
			if (result?.url) {
				setMediaUrl(result.url);
				onImageUploads(result.url);
			}
		} catch (error) {
			console.error("Image upload failed:", error);
		}
	};
	const handleRemoveImage = () => {
		setMediaUrl("");
		setFile(null);
		onRemoveImage();
	};

	return (
		<div>
			<div className="mb-4 flex items-center gap-4">
				{mediaUrl && (
					<div className="relative w-[200px] h-[200px]">
						<div className="z-10 absolute top-2 right-2">
							<Button
								type="button"
								onClick={handleRemoveImage}
								variant="destructive"
								size="sm">
								<Trash className="h-4 w-4" />
							</Button>
						</div>
						<Image
							src={mediaUrl}
							alt="Preview"
							className="object-cover w-full h-full"
							width={400}
							height={400}
						/>
					</div>
				)}
			</div>
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="hidden"
				id="imageUpload"
			/>
			<label htmlFor="imageUpload">
				<Button
					type="button"
					variant="secondary"
					onClick={() => document.getElementById("imageUpload")?.click()}>
					<ImagePlus className="h-4 w-4 mr-2" />
					Upload an Image
				</Button>
			</label>
			{file && (
				<Button
					type="button"
					variant="ghost"
					onClick={handleUpload}
					className="mt-2">
					Upload Image
				</Button>
			)}
		</div>
	);
}
