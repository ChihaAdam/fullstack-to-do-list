import { Accordion } from "@/components/ui/accordion";
import { useMemo } from "react";
import TodoComponent from "@/components/TodoPending/Todo";
import AddTodo from "@/components/AddTodo";
import { LoadingMinimal } from "@/components/ui/Loading";
import { useTodos } from "@/context/TodosContext";
import { Separator } from "@/components/ui/separator";
const PendingTodos = () => {
  const { data, status, fetchTodos } = useTodos();
  const pending = useMemo(() => {
    return [...data].filter((todo) => todo.completed === false);
  }, [data]);
  if (status === "loading") return <LoadingMinimal />;
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="m-8"
        defaultValue="item-1"
      >
        {pending.length > 0 ? (
          pending.map((todo, index) => (
            <TodoComponent todo={todo} index={index}></TodoComponent>
          ))
        ) : (
          <>
            <Separator />
            <p className="text-center"> add your first todo</p>
            <Separator />
          </>
        )}
      </Accordion>
      <AddTodo fetchTodos={fetchTodos} />
    </>
  );
};

export default PendingTodos;
