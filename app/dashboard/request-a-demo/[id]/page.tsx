import getProduct from "@/actions/get-product";
import UpdateForm from "../_components/update-form";

export default async function EditProduct({
	params,
}: {
	params: { id: string };
}) {
	const { id } = await params;
	const product = await getProduct(id);
	return <UpdateForm responses={product} />;
}
