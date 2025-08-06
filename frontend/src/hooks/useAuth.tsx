import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("no auth context provided");
  return authContext
};
