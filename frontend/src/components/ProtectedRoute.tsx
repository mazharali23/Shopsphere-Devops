import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

