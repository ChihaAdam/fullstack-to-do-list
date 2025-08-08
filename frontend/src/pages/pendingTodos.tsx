import { Accordion } from "@/components/ui/accordion";
import { useMemo } from "react";
import TodoComponent from "@/components/TodoPending/Todo";
import { Toaster } from "sonner";
import AddTodo from "@/components/AddTodo";
import { LoadingMinimal } from "@/components/ui/Loading";
import { useTodos } from "@/context/TodosContext";
const PendingTodos = () => {
  const { data ,status, fetchTodos } =useTodos();
  const pending = useMemo(() => {
    return [...data].filter((todo) => todo.completed === false);
  }, [data]);
  if (status==='loading') return <LoadingMinimal />
  return (
    <>
    <Toaster  className="shadow-md text-lg"/>
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
    <AddTodo fetchTodos={fetchTodos}/>
    </>
  );
};

export default PendingTodos;
