import { useAuth } from "@/providers/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
	const { isAuthenticated } = useAuth();

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
