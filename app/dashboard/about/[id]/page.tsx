import UpdateForm from "../_components/update-form";
import getSubCategory from "@/actions/get-subCategory";

export default async function EditSubCategory({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const subCategory = await getSubCategory(id);
	return <UpdateForm response={subCategory} />;
}
