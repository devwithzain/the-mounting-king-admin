import { useAuth } from "@/providers/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
	const { isAuthenticated } = useAuth();

	// If authentication is still loading, show nothing
	if (isAuthenticated === undefined) return null;

	// Redirect authenticated users to dashboard
	return isAuthenticated ? (
		<Navigate
			to="/dashboard"
			replace
		/>
	) : (
		<Outlet />
	);
};

export default PublicRoute;
