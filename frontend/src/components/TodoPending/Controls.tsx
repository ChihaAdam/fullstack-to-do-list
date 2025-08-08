import type { Todo} from "@/types/types";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetContent,
  SheetFooter,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState, type ChangeEvent } from "react";
import { useCompleteTodo, useUpdateTodo } from "@/hooks/useFetch";
import { toast } from "sonner";
import { useTodos } from "@/context/TodosContext";
const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};
function Controls({
  todo,
}: {
  todo: Todo;
}) {
  const [currentTodo, setCurrentTodo] = useState<Todo>(todo);
  const {fetchTodos}=useTodos();
  const {updateTodo} = useUpdateTodo(todo._id,fetchTodos);
  const {completeTodo}=useCompleteTodo(todo._id,fetchTodos);
  const titleLength=currentTodo.title.length;
  const descriptionLength=currentTodo.description.length;
  const isValid=titleLength>=1 && titleLength<=50 && descriptionLength<=500
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentTodo({ ...currentTodo, description: e.target.value });
  };
  const handleUpdateTodo=async ()=>{
    await updateTodo(currentTodo);
    toast('todo updated successfully');
  }
  const handleComplete=async ()=>{
    await completeTodo()
    toast('todo completed successfully')
  }
  return (
    <div className="flex gap-1" onClick={stopPropagation}>
      <Button variant="outline" onClick={handleComplete}>complete</Button>
      <Sheet>
        <SheetTrigger>
          <Button  variant="secondary">update</Button>
        </SheetTrigger>
        <SheetContent className="z-100">
          <SheetTitle>update todo</SheetTitle>
          <SheetHeader className="flex flex-col gap-2">
            <Input value={currentTodo.title} onChange={handleTitleChange} />
            <Textarea
              className="resize-none"
              rows={8}
              onChange={handleDescriptionChange}
              value={currentTodo.description}
            />
          </SheetHeader>
          <SheetFooter className="flex flex-col w-full">
            <SheetClose>
              <Button className="w-full" onClick={handleUpdateTodo} disabled={!isValid}>save changes</Button>
            </SheetClose>
            <SheetClose>
              <Button variant="outline" className="w-full">
                close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Controls;
