import Home from "@/pages/Home";
import Layout from "./components/layout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import PublicRoute from "./components/public-route";
import Product from "./pages/dashboard/products/Product";
import { AuthProvider } from "./providers/auth-provider";
import ProtectedRoute from "./components/protected-route";
import ProductForm from "./pages/dashboard/products/ProductForm";

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route
						path="/"
						element={<Home />}
					/>
				</Route>
				<Route element={<Layout />}>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						/>
						<Route
							path="/dashboard/products"
							element={<Product />}
						/>
						<Route
							path="/dashboard/products/new"
							element={<ProductForm />}
						/>
						<Route
							path="/dashboard/products/:id"
							element={<ProductForm />}
						/>
					</Route>
				</Route>
			</Routes>
		</AuthProvider>
	);
}
