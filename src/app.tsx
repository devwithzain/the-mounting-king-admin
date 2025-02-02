import Home from "@/pages/Home";
import Layout from "./components/layout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Product from "./pages/dashboard/products/Product";
import ProductForm from "./pages/dashboard/products/ProductForm";

export default function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/"
				element={<Layout />}>
				<Route
					path="/dashboard"
					element={<Dashboard />}
				/>
				{/* product page */}
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
		</Routes>
	);
}
