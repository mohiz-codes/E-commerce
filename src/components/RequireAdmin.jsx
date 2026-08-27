import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function RequireAdmin({ children }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login?next=/admin" replace />;
  return user?.role === "admin" ? children : <Navigate to="/" replace />;
}
