import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    location.state?.user ? true : null
  );
  const [user, setUser] = useState(location.state?.user || null);

  useEffect(() => {
    // If user data was passed from AuthCallback, skip auth check
    if (location.state?.user) {
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [navigate, location.state]);

  // Still checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finn-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-finn-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - will redirect
  if (isAuthenticated === false) {
    return null;
  }

  // Authenticated - render children
  return children;
};

export default ProtectedRoute;
