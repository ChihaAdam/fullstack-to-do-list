import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import Nav from "@/components/Nav";
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  if (token)
    return (
      <>
        <Nav />
        {children}
      </>
    );
  return <Navigate to="/login"></Navigate>;
};
export const ProtectedLogin = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  if (!token) return <>{children}</>;
  return <Navigate to="/"></Navigate>;
};
