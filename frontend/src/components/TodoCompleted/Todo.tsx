import type { Todo } from "@/types/types";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";
import { format } from "date-fns";
import { useDeleteTodo } from "@/hooks/useFetch";
import  Delete  from "./Delete.tsx"
import { Textarea } from "../ui/textarea.tsx";
type TodoTypes = {
  todo: Todo;
  index: number;
};
function TodoComponent({ todo, index }: TodoTypes) {
  const {} = useDeleteTodo(todo._id);
  return (
    <AccordionItem
      value={`Item-${index}`}
      key={todo._id}
      className=" hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2"
    >
      <div className="flex justify-between items-center w-full gap-2">
        <AccordionTrigger className="flex-1">
          {`${index+1}) ${todo.title}`}
        </AccordionTrigger>
        <Delete id={todo._id}></Delete>
      </div>
      <AccordionContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <span className="opacity-75 font-bold">Description :</span>
          <Textarea readOnly className="resize-none" value={todo.description}></Textarea>
        </div>
        <div>
          <span className="opacity-75 font-bold">created at :</span>
          {format(todo.createdAt, "eeee, MMMM do yyyy 'at' h:mm a")}
        </div>
        <div>
          <span className="opacity-75 font-bold">updated at :</span>
          {format(todo.updatedAt, "eeee, MMMM do yyyy 'at' h:mm a")}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default TodoComponent;
