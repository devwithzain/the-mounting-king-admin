import getCategory from "@/actions/get-category";
import UpdateForm from "../_components/update-form";

export default async function EditCategory({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const category = await getCategory(id);
	return <UpdateForm response={category} />;
}
