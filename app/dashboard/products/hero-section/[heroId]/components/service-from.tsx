"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Heading from "@/components/heading";
import { product_hero } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { productHeroFormSchema, TproductFormData } from "@/schemas";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export default function ServiceForm({
	initialData,
}: {
	initialData: product_hero | null;
}) {
	const params = useParams();
	const router = useRouter();

	const form = useForm<TproductFormData>({
		resolver: zodResolver(productHeroFormSchema),
		defaultValues: initialData || {
			title: "",
		},
	});

	const {
		formState: { isSubmitting },
	} = form;

	const title = initialData ? "Edit content" : "Create content";
	const description = initialData ? "Edit content" : "Add a new content";
	const action = initialData ? "Save changes" : "Create";
	const toastMessage = initialData ? "content updated." : "content created.";

	const onSubmits = async (data: TproductFormData) => {
		try {
			if (initialData) {
				await axios.put(
					`${process.env.NEXT_PUBLIC_LARAVEL_BACKEND_API_URL}/productHero/${params.heroId}`,
					data,
				);
			}
			router.push(`/dashboard/products/hero-section`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={title}
					description={description}
				/>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmits)}
					className="space-y-4 w-full">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Title"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={isSubmitting}
						type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
}
