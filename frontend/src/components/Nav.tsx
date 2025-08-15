import { ListTodo } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Dialog, DialogTrigger } from "./ui/dialog.tsx";
import { useUserInfo } from "@/context/userInfoContext.tsx";
import { lazy, Suspense } from "react";
const Settings = lazy(()=>import('./Settings.tsx'))
function Nav() {
  const route = location.pathname;
  const navigate = useNavigate();
  const {userInfo}=useUserInfo()
  return (
    <>
      <div
        className="w-screen p-4 bg-zinc-100 dark:bg-zinc-800 flex justify-between shadow-sm 
                 shadow-zinc-500 dark:shadow-zinc-900 select-none items-center max-md:flex-wrap gap-4"
      >
        <div className="flex gap-2 max-md:justify-center max-md:w-full w-fit items-center">
          <ListTodo className="size-8" />
          <h1 className="text-4xl font-bold">Todo List</h1>
        </div>
        <ul className="flex cursor-pointer rounded-full shadow-md bg-zinc-200 dark:bg-zinc-900 border-1 items-center p-1 font-bold">
          <li
            className={`py-2 px-4 rounded-full ${
              route === "/"
                ? "bg-white dark:bg-dark dark:bg-zinc-950 border-1 border-black/20 dark:border-white/20"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-700 text-black/65 dark:text-white/75"
            }`}
            onClick={() => navigate("/")}
          >
            pending
          </li>
          <li
            className={`py-2 px-4 rounded-full  ${
              route === "/completed"
                ? "bg-white dark:bg-zinc-950 dark:bg-dark border-1 border-black/20 dark:border-white/20"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-700 text-black/65 dark:text-white/75"
            }`}
            onClick={() => navigate("/completed")}
          >
            completed
          </li>
        </ul>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-lg flex gap-4 hover:bg-gray-500/5 p-2"
            >
              <img src="./avatar.svg" className="size-7" loading="lazy"/>
              {userInfo?.username}
            </Button>
          </DialogTrigger>
          <Suspense fallback={<div className="hidden" />}>
            <Settings />
          </Suspense>
        </Dialog>
      </div>
      <Toaster className="shadow-md text-lg" />
    </>
  );
}

export default Nav;
