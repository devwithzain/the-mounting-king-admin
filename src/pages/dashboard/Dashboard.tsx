import { Sales } from "@/components/sales";
import { ServiceChart } from "@/components/service-chart";

export default function Dashboard() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full justify-between">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="rounded-xl">
					<Sales />
				</div>
				<div className="rounded-xl">
					<Sales />
				</div>
				<div className="rounded-xl">
					<Sales />
				</div>
			</div>
			<div className="rounded-xl h-full">
				<ServiceChart />
			</div>
		</div>
	);
}
