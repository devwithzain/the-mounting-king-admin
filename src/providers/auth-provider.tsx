import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	// Check authentication on every render
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!Cookies.get("authToken"),
	);

	useEffect(() => {
		const token = Cookies.get("authToken");
		setIsAuthenticated(!!token);
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
