import type { Todo, TodoRaw } from "@/types/types";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";
import { format } from "date-fns";
import Controls from "./Controls";

function TodoComponent({
  todo,
  index,
  
}: {
  todo: Todo;
  index: number;
}) {
  return (
    <AccordionItem
      value={`Item-${index}`}
      key={todo._id}
      className=" hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2"
    >
      <AccordionTrigger>
        <div className="flex justify-between w-full">
          <span>
            {index + 1 + ")  "} {todo.title}
          </span>
          <Controls todo={todo}></Controls>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div>
          <span className="opacity-75 font-bold">Description :</span>
          {todo.description}
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
