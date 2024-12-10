import { TheadingProps } from "@/types";

export default function Heading({ description, title }: TheadingProps) {
	return (
		<div>
			<h1 className="text-3xl tracking-tighter font-bold">{title}</h1>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
