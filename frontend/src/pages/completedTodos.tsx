import { useFetchTodos } from "@/hooks/useFetch";
import { Accordion } from "@/components/ui/accordion";
import { useMemo } from "react";
import TodoComponent from "@/components/Todo";
const CompletedTodos = () => {
  const { data } = useFetchTodos();
  const completed = useMemo(() => {
    return [...data].filter((todo) => todo.completed === true);
  }, [data]);
  return (
    <Accordion
      type="single"
      collapsible
      className="m-8 border-y-1 border-gray-800 dark:border-gray-200"
      defaultValue="item-1"
    >
      {completed.length > 0 ? (
        completed.map((todo, index) => (
          <TodoComponent todo={todo} index={index}></TodoComponent>
        ))
      ) : (
        <p className="text-center"> you have not completed any todo yet</p>
      )}
    </Accordion>
  );
};

export default CompletedTodos;
