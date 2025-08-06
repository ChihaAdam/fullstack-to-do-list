import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { userCredentials } from "@/types/types";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
const Signup = () => {
  const {signup,status}=useAuth()
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
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    signup(credentials);
  }
  return (
    <form className="flex flex-col gap-4 my-8 max-w-xl mx-auto" onSubmit={handleSubmit}>
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
      <Button type="submit" disabled={!isValid || status==='loading'}  className="btn-gradiant">signup</Button>
      <div>You have already an account ? <Link to='/login' className="underline font-semibold">login</Link></div>
    </form>
  );
};

export default Signup;
