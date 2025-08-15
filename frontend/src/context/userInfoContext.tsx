import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { api } from "@/lib/axiosInstances";
import type { userInfo } from "@/types/types";
import { toast } from "sonner";
type infoToUpdate =
  | { username: string }
  | { password: string }
type userInfoContext =
  | undefined
  | {
      userInfo: null | userInfo;
      getUserInfo: () => Promise<void>;
      handleInfoChange: (arg: infoToUpdate) => Promise<void>;
      setUserInfo: (arg: userInfo) => void;
    };

const UserInfoContext = createContext<userInfoContext>(undefined);
export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, setToken } = useAuth();
  const [userInfo, setUserInfo] = useState<null | userInfo>(null);
  async function getUserInfo() {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: token,
        },
      });
      setUserInfo(response.data.info);
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
    }
  }
  async function handleInfoChange(info: infoToUpdate) {
    try {
      await api.patch("/users", info, {
        headers: {
          Authorization: token,
        },
      });
      toast("user info updated successfully");
      getUserInfo();
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
      if (status == 409) {
        toast("username already exists", {
          description: "choose another one",
        });
      } else {
        toast("something went wrong", {
          description: "Please try again.",
        });
      }
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <UserInfoContext.Provider
      value={{ userInfo, getUserInfo, handleInfoChange, setUserInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
export const useUserInfo = () => {
  const userInfo = useContext(UserInfoContext);
  if (!userInfo) throw new Error("no userInfo context provided");
  return userInfo;
};
