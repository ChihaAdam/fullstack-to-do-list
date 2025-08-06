import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { AlertCircle, Eye, EyeClosed } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import type { userCredentials } from "@/types/types";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
const Login = () => {
  const {login,status}=useAuth()
  const [isHidden, setIsHidden] = useState(true);
  const [credentials, setCredentials] = useState<userCredentials>({
    username: "",
    password: "",
  });
  const isValid =
    credentials.username.length <= 16 &&
    credentials.username.length >= 4 &&
    credentials.password.length >= 6;
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, username: e.target.value.trim() });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, password: e.target.value.trim() });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(credentials)
  };
  return (
    <form
      className="flex flex-col gap-4 my-8 max-w-xl mx-auto"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="username">username</Label>
      <Input id="username" onChange={handleUsernameChange}></Input>
      <div className="flex justify-between">
        <Label htmlFor="password">password</Label>
        {isHidden ? (
          <EyeClosed onClick={() => setIsHidden(!isHidden)} />
        ) : (
          <Eye onClick={() => setIsHidden(!isHidden)} />
        )}
      </div>
      <Input
        id="password"
        type={isHidden ? "password" : "text"}
        onChange={handlePasswordChange}
      ></Input>
      <Button type="submit" disabled={!isValid || status == "loading"} className="btn-gradiant">
        login
      </Button>
        <div>Not regisred yet ? <Link to='/signup' className="underline font-semibold">signup</Link></div>
    </form>
  );
};

export default Login;
