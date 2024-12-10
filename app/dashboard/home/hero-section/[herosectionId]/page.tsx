import BillboardForm from "./components/billboard-from";

export default async function BillboardPage() {
	const billboard = [
		{
			id: "1",
			label: "Billboard 1",
			createdAt: new Date(),
		},
	];
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-8 p-8 pt-6">
				<BillboardForm initialData={billboard} />
			</div>
		</div>
	);
}
