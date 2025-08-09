import type { Todo } from "@/types/types";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "../ui/accordion";
import { format } from "date-fns";
import Controls from "./Controls";
import { Textarea } from "../ui/textarea";

function TodoComponent({ todo, index }: { todo: Todo; index: number }) {
  return (
    <AccordionItem
      value={`Item-${index}`}
      key={todo._id}
      className=" hover:bg-zinc-100 dark:hover:bg-zinc-800 px-2"
    >
      <div className="flex w-full items-center gap-2 border-b-1">
        <AccordionTrigger className="flex-1 rounded-none w-full">
          {index + 1 + ")  "} {todo.title}
        </AccordionTrigger>
        <Controls todo={todo}></Controls>
      </div>
      <AccordionContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
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
