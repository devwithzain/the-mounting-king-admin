"use client";
import { Plus } from "lucide-react";
import Heading from "@/components/heading";
import { useRouter } from "next/navigation";
import { columns } from "@/components/columns";
import { Button } from "@/components/ui/button";
import Sidebar from "../../../components/sidebar";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components";

export default function HomePage() {
	const router = useRouter();
	const data = [
		{
			id: "1",
			label: "Billboard 1",
			createdAt: new Date(),
		},
	];
	return (
		<SidebarProvider>
			<Sidebar />
			<SidebarInset>
				<Navbar />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<div className="flex items-center justify-between">
						<Heading
							title={`Hero Section`}
							description="Manage hero section content for your website"
						/>
						<Button
							className="flex items-center gap-x-2"
							onClick={() => router.push(`/dashboard/home/hero-section/new`)}>
							<Plus className="w-4 h-4" />
							Add new
						</Button>
					</div>
					<Separator />
					<DataTable
						columns={columns}
						data={data}
						searchKey="label"
					/>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
