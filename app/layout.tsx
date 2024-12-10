import "@/styles/globals.css";
import type { Metadata } from "next";
import ToastProvider from "@/providers/toast-provider";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
	title: "The Mounting King",
	description: "The Mounting King",
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<ToastProvider />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
