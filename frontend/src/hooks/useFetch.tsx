import { useAuth } from "@/context/AuthContext";
import { useTodos } from "@/context/TodosContext";
import { api } from "@/lib/axiosInstances.ts";
import type { TodoRaw } from "@/types/types";
import { toast } from "sonner";
export const useAddTodo = (fetchTodos: () => Promise<void>) => {
  const { token, setToken } = useAuth();
  async function addTodo(todoToAdd: TodoRaw) {
    try {
      await api.post("/todos", todoToAdd, {
        headers: {
          Authorization: token,
        },
      });
      toast("todo has been created .");
      await fetchTodos();
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
      toast("something went wrong", {
        description: "Please try again.",
      });
    }
  }
  return { addTodo };
};
export const useUpdateTodo = (id: string) => {
  const { token, setToken } = useAuth();
  const { fetchTodos } = useTodos();
  async function updateTodo(todoToUpdate: TodoRaw) {
    try {
      await api.patch(
        `/todos`,
        { updates: todoToUpdate, id: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast("todo updated successfully");
      await fetchTodos();
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
      toast("something went wrong", {
        description: "Please try again.",
      });
    }
  }
  return { updateTodo };
};
export const useCompleteTodo = (id: string) => {
  const { token, setToken } = useAuth();
  const { fetchTodos } = useTodos();
  async function completeTodo() {
    try {
      await api.patch(
        `/todos/complete/`,
        { id: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast("todo completed successfully");
      await fetchTodos();
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
      toast("something went wrong", {
        description: "Please try again.",
      });
    }
  }
  return { completeTodo };
};
export const useDeleteTodo = (id: string) => {
  const { token, setToken } = useAuth();
  const { fetchTodos } = useTodos();
  async function deleteTodo() {
    try {
      await api.delete(`/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      toast("deleted successfully");
      await fetchTodos();
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
      toast("something went wrong", {
        description: "Please try again.",
      });
      
    }
  }
  return { deleteTodo };
};