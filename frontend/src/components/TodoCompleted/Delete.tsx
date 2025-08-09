import { useDeleteTodo } from "@/hooks/useFetch";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { DeleteIcon } from "lucide-react";
function Delete({ id }: { id: string }) {
  const {deleteTodo}=useDeleteTodo(id)
  const handleDelete=async()=>await deleteTodo()
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex-0">
        <Button variant="destructive" className="font-bold flex justify-between items-center"><DeleteIcon />delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Delete;
