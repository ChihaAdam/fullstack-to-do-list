import { ListTodo } from "lucide-react";
import { useAuth } from "@/hooks/useAuth.tsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu.tsx'
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
function Nav() {
  const route = location.pathname;
  const navigate = useNavigate()
  const {signout}=useAuth();
  const toggleDarkmode=()=>document.documentElement.classList.toggle('dark')
  return (
    <div className="w-screen p-4 bg-zinc-100 dark:bg-zinc-800 flex justify-between shadow-sm shadow-zinc-500 dark:shadow-zinc-900 select-none">
      <div className="flex gap-2 w-fit items-center">
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
          onClick={() => navigate('/')}
        >
          pending
        </li>
        <li
          className={`py-2 px-4 rounded-full  ${
            route === "/completed"
              ? "bg-white dark:bg-zinc-950 dark:bg-dark border-1 border-black/20 dark:border-white/20"
              : "hover:bg-zinc-200 dark:hover:bg-zinc-700 text-black/65 dark:text-white/75"
          }`}
          onClick={() =>navigate('/completed')}
        >
          completed
        </li>
      </ul>
      <DropdownMenu >
        <DropdownMenuTrigger className="focus:outline-0" asChild>
          <Button variant="outline">options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={toggleDarkmode}>toggle darkmode</DropdownMenuItem>
          <DropdownMenuItem onClick={signout}>sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Nav;
