"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteButton({
	id,
	path,
}: {
	id: string;
	path: string;
}) {
	const router = useRouter();
	const deletePost = async (id: string) => {
		try {
			await axios.delete(`${path}/${id}`, {
				data: {
					id,
				},
			});
		} catch (error) {
			toast.error("Error", error);
		} finally {
			router.refresh();
			toast.success("Deleted");
		}
	};

	return (
		<button
			className="text-[14px]  font-semibold bg-[#081226] text-white py-2 px-4 rounded-lg"
			onClick={() => deletePost(id)}>
			Delete
		</button>
	);
}
