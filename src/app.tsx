import Home from "@/pages/Home";
import Layout from "./components/layout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import PublicRoute from "./components/public-route";
import Product from "./pages/dashboard/products/Product";
import Service from "./pages/dashboard/services/Service";
import { AuthProvider } from "./providers/auth-provider";
import ProtectedRoute from "./components/protected-route";
import ProductForm from "./pages/dashboard/products/ProductForm";
import ServiceForm from "./pages/dashboard/services/ServiceForm";

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				{/* Public Route for Home */}
				<Route element={<PublicRoute />}>
					<Route
						path="/"
						element={<Home />}
					/>
				</Route>
				{/* Protected Dashboard Routes */}
				<Route element={<ProtectedRoute />}>
					<Route
						path="/dashboard"
						element={<Layout />}>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						/>
						{/* Products Routes */}
						<Route
							path="products"
							element={<Product />}
						/>
						<Route
							path="products/new"
							element={<ProductForm />}
						/>
						<Route
							path="products/:id"
							element={<ProductForm />}
						/>
						{/* Services Routes */}
						<Route
							path="services"
							element={<Service />}
						/>
						<Route
							path="services/new"
							element={<ServiceForm />}
						/>
						<Route
							path="services/:id"
							element={<ServiceForm />}
						/>
					</Route>
				</Route>
			</Routes>
		</AuthProvider>
	);
}
