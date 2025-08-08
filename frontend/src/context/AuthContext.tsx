import { createContext, useEffect, useState } from "react";
import { api } from "@/lib/axiosInstances";
import type { status, userCredentials } from "@/types/types";
import { Loading } from "@/components/ui/Loading";
/*-----------------------------------types-------------------------------------------*/

type AuthContextType =
  | undefined
  | {
      token: string | null;
      setToken: (arg: string | null) => void;
      status: status;
      login: (arg: userCredentials) => void;
      signup: (arg: userCredentials) => void;
      signout: () => void;
      error: string | null;
    };
type AuthProviderType = {
  children?: React.ReactNode;
};
/*----------------------------------------------------------------------------------*/
export const AuthContext = createContext<AuthContextType>(undefined);
const errors: Record<number, string> = {
  401: "incorrect username or password",
  409: "username already exists",
  500: "internal server error",
};
export const AuthProvider = ({ children }: AuthProviderType) => {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<status>("idle");
  const [checkTokenStatus, setCheckTokenStatus] = useState<"idle" | "loading">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function refreshToken() {
      try {
        const response = await api.get("/refresh", { withCredentials: true });
        setToken(response.data.accessToken);
      } catch (err) {
        setToken(null);
      }
      setCheckTokenStatus("idle");
    }
    if (!token) refreshToken();
  }, [token]);
  const login = async (credentials: userCredentials) => {
    try {
      setStatus("loading");
      const response = await api.post("/users/login", credentials);
      setStatus("success");
      setToken(response.data.accessToken);
      setError(null);
    } catch (err: any) {
      const status: number = err.response.status;
      setError(errors[status]);
      setStatus("error");
    }
  };
  const signout = async () => {
    try {
      setStatus("loading");
      await api.get("/users/signout");
      setStatus("success");
      setToken(null);
    } catch (err) {
      setStatus("error");
    }
  };
  const signup = async (credentials: userCredentials) => {
    try {
      setStatus("loading");
      const response = await api.post("/users/signup", credentials);
      setStatus("success");
      setToken(response.data.accessToken);
      setError(null);
    } catch (err: any) {
      const status: number = err.response.status;
      setError(errors[status]);
      setStatus("error");
    }
  };
  if (checkTokenStatus === "loading") return <Loading />;
  return (
    <AuthContext.Provider
      value={{ token, status, login, signup, setToken, signout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
