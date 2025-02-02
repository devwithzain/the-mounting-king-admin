import App from "@/app";
import "@/styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ToastProvider from "@/providers/toast-provider";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router>
			<ThemeProvider>
				<ToastProvider />
				<App />
			</ThemeProvider>
		</Router>
	</StrictMode>,
);
