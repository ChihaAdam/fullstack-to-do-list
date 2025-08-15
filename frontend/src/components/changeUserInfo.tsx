import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUserInfo } from "@/context/userInfoContext";

function ChangeUserLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleInfoChange } = useUserInfo()
  const isUsernameValid = username.length>=4 && username.length<=16;
  const isPasswordValid = password.length>=6;
  const handleUsernameChange = async () => {
    await handleInfoChange({ username: username });
  };
  const handlePasswordChange = async () => {
    await handleInfoChange({ password: password });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Input onChange={(e) => setUsername(e.target.value)}></Input>
        <Button
          variant="secondary"
          onClick={handleUsernameChange}
          disabled={!isUsernameValid}
        >
          change username
        </Button>
      </div>
      <div className="flex gap-4">
        <Input onChange={(e) => setPassword(e.target.value)}></Input>
        <Button
          variant="secondary"
          onClick={handlePasswordChange}
          disabled={!isPasswordValid}
        >
          change password
        </Button>
      </div>
    </div>
  );
}

export default ChangeUserLogin;
