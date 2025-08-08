import { Accordion } from "@/components/ui/accordion";
import { useMemo } from "react";
import TodoComponent from "@/components/TodoCompleted/Todo.tsx"
import { LoadingMinimal } from "@/components/ui/Loading";
import { useTodos } from "@/context/TodosContext";
const CompletedTodos = () => {
  const { data,status } = useTodos()
  const completed = useMemo(() => {
    return [...data].filter((todo) => todo.completed === true);
  }, [data]);
  if (status==='loading') return <LoadingMinimal />
  return (
    <Accordion
      type="single"
      collapsible
      className="m-8 border-y-1 border-gray-800 dark:border-gray-200"
      defaultValue="item-1"
    >
      {completed.length > 0 ? (
        completed.map((todo, index) => (
          <TodoComponent todo={todo} index={index} />
        ))
      ) : (
        <p className="text-center"> you have not completed any todo yet</p>
      )}
    </Accordion>
  );
};

export default CompletedTodos;
