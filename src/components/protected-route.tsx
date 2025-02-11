import { useAuth } from "@/providers/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const { isAuthenticated } = useAuth();

	// If authentication is still loading, show nothing
	if (isAuthenticated === undefined) return null;

	// Redirect if not authenticated
	return isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate
			to="/"
			replace
		/>
	);
};

export default ProtectedRoute;
