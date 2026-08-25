import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  if (!isAuthenticated) {
    return <Navigate to={`/login?next=${encodeURIComponent(currentPath)}`} replace />;
  }

  return children;
}

export default RequireAuth;