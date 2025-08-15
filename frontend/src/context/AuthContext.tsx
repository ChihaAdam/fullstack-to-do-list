import { createContext, useContext, useEffect, useState } from "react";
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
      deleteAccount: () => void;
      error: string | null;
      username: string | null;
      setUsername: (arg: string) => void;
    };
type AuthProviderType = {
  children?: React.ReactNode;
};
/*----------------------------------------------------------------------------------*/
export const AuthContext = createContext<AuthContextType>(undefined);
const errors: Record<number, string> = {
  401: "incorrect username or password",
  409: "username already exists",
  500: "unexpected error occured",
};
export const AuthProvider = ({ children }: AuthProviderType) => {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<status>("idle");
  const [checkTokenStatus, setCheckTokenStatus] = useState<"idle" | "loading">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
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
      setUsername(response.data.username);
    } catch (err: any) {
      const status: number = err.response?.status || 500;
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
      setUsername(response.data.username);
    } catch (err: any) {
      const status = err.response?.status || 500;
      setError(errors[status]);
      setStatus("error");
    }
  };
  const deleteAccount = async () => {
    try {
      setStatus("loading");
      await api.delete("/users", {
        headers: {
          Authorization: token,
        },
      });
      setStatus("success");
      setError(null);
      setToken(null);
      location.reload();
    } catch (err: any) {
      const status = err.response?.status || 500;
      setError(errors[status]);
      setStatus("error");
    }
  };
  if (checkTokenStatus === "loading") return <Loading />;
  return (
    <AuthContext.Provider
      value={{
        token,
        status,
        login,
        signup,
        setToken,
        signout,
        error,
        deleteAccount,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("no auth context provided");
  return authContext;
};
