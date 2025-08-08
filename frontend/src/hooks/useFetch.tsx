import { useAuth } from "./useAuth";
import { api } from "@/lib/axiosInstances.ts";
import type { TodoRaw } from "@/types/types";
export const useAddTodo = (fetchTodos: () => Promise<void>) => {
  const { token, setToken } = useAuth();
  async function addTodo(todoToAdd: TodoRaw) {
    try {
      await api.post("/todos", todoToAdd, {
        headers: {
          Authorization: token,
        },
      });
      await fetchTodos();
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
    }
  }
  return { addTodo };
};
export const useUpdateTodo = (id: string, fetchTodos: () => Promise<void>) => {
  const { token, setToken } = useAuth();
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
      await fetchTodos();
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
    }
  }
  return { updateTodo };
};
export const useCompleteTodo = (
  id: string,
  fetchTodos: () => Promise<void>
) => {
  const { token, setToken } = useAuth();
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
      await fetchTodos();
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
    }
  }
  return { completeTodo };
};
