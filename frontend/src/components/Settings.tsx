import { useAuth } from "@/context/AuthContext";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import DeleteAccount from "./DeleteAccount";
import ChangeUserLogin from "./changeUserInfo";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
function Settings() {
  const { signout } = useAuth();
  const [isDarkmode, setIsDarkmode] = useLocalStorage('isDark',false)
  const toggleDarkmode = () => {
    setIsDarkmode(!isDarkmode);
  };
  useEffect(()=>{
    document.documentElement.classList.toggle("dark",isDarkmode);
  },[isDarkmode])
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>
          here there is display and user settings
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <Label htmlFor="darkmode-switch">toggle darkmode : </Label>
          <Switch
            id="darkmode-switch"
            onClick={toggleDarkmode}
            checked={isDarkmode}
          ></Switch>
        </div>
        <ChangeUserLogin />
        <div className="flex gap-2 w-full">
          <Button className="flex-1" onClick={signout}>
            signout
          </Button>
          <DeleteAccount />
        </div>
      </div>
      <DialogFooter className="w-full">
        <DialogClose asChild>
          <Button variant="outline" className="w-full">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export default Settings;
