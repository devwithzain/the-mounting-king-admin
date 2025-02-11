import Home from "@/pages/Home";
import Layout from "./components/layout";
import User from "./pages/dashboard/users/User";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import PublicRoute from "./components/public-route";
import Account from "./pages/dashboard/account/Account";
import Product from "./pages/dashboard/products/Product";
import Service from "./pages/dashboard/services/Service";
import { AuthProvider } from "./providers/auth-provider";
import ProtectedRoute from "./components/protected-route";
import ProductForm from "./pages/dashboard/products/ProductForm";
import ServiceForm from "./pages/dashboard/services/ServiceForm";
import RequestADemoPage from "./pages/dashboard/request-a-demo/RequestADemoPage";
import RequestADemoPageForm from "./pages/dashboard/request-a-demo/RequestADemoPageForm";
import EmployeePage from "./pages/dashboard/employees/Employee";
import EmployeeForm from "./pages/dashboard/employees/EmployeeForm";

export default function App() {
	return (
		<AuthProvider>
			<Routes>
				{/* Public Route for Home/Login */}
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
							index
							element={<Dashboard />}
						/>
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
						<Route
							path="request-a-demo"
							element={<RequestADemoPage />}
						/>
						<Route
							path="request-a-demo/new"
							element={<RequestADemoPageForm />}
						/>
						<Route
							path="request-a-demo/:id"
							element={<RequestADemoPageForm />}
						/>
						<Route
							path="users"
							element={<User />}
						/>
						<Route
							path="account"
							element={<Account />}
						/>
						<Route
							path="employees"
							element={<EmployeePage />}
						/>
						<Route
							path="employees/new"
							element={<EmployeeForm />}
						/>
						<Route
							path="employees/:id"
							element={<EmployeeForm />}
						/>
					</Route>
				</Route>
			</Routes>
		</AuthProvider>
	);
}
