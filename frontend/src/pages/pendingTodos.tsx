import { useFetchTodos } from "@/hooks/useFetch";
import { Accordion } from "@/components/ui/accordion";
import { useMemo } from "react";
import TodoComponent from "@/components/Todo";
const PendingTodos = () => {
  const { data } = useFetchTodos();
  const pending = useMemo(() => {
    return [...data].filter((todo) => todo.completed === false);
  }, [data]);
  return (
    <Accordion
      type="single"
      collapsible
      className="m-8 border-y-1 border-gray-800 dark:border-gray-200"
      defaultValue="item-1"
    >
      {pending.length > 0 ? (
        pending.map((todo, index) => (
          <TodoComponent todo={todo} index={index}></TodoComponent>
        ))
      ) : (
        <p className="text-center"> add your first todo</p>
      )}
    </Accordion>
  );
};

export default PendingTodos;
