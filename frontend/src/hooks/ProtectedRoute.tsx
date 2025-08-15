import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Nav from "@/components/Nav";
import { TodosProvider } from "@/context/TodosContext";
import UserProvider from "@/context/userInfoContext";
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  if (token)
    return (
      <>
        <UserProvider>
          <Nav />
        </UserProvider>
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
