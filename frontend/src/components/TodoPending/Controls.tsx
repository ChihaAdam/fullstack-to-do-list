import type { Todo } from "@/types/types";
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
const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};
function Controls({ todo }: { todo: Todo }) {
  const [currentTodo, setCurrentTodo] = useState<Todo>(todo);
  const { updateTodo } = useUpdateTodo(todo._id);
  const { completeTodo } = useCompleteTodo(todo._id);
  const titleLength = currentTodo.title.length;
  const descriptionLength = currentTodo.description.length;
  const isValid =
    titleLength >= 1 && titleLength <= 50 && descriptionLength <= 500;
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentTodo({ ...currentTodo, description: e.target.value });
  };
  const handleUpdateTodo = async () => {
    await updateTodo(currentTodo);
  };
  const handleComplete = async () => {
    await completeTodo();
  };
  return (
    <div className="flex gap-1 flex-0 w-fit" onClick={stopPropagation}>
      <Button variant="outline" onClick={handleComplete}>
        complete
      </Button>
      <Sheet>
        <SheetTrigger>
          <Button variant="secondary">update</Button>
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
              <Button
                className="w-full"
                onClick={handleUpdateTodo}
                disabled={!isValid}
              >
                save changes
              </Button>
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
