import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import Nav from "@/components/Nav";
import { TodosProvider } from "@/context/TodosContext";
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  if (token)
    return (
      <>
        <Nav />
        <TodosProvider>
          {children}
        </TodosProvider>
      </>
    );
  return <Navigate to="/login"></Navigate>;
};
export const ProtectedLogin = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  if (!token) return <>{children}</>;
  return <Navigate to="/"></Navigate>;
};
