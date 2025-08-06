import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";
import { api } from "@/lib/axiosInstances.ts";
import type { Todo, status } from "@/types/types";
export const useFetchTodos = () => {
  const { token, setToken } = useAuth();
  const [status, setStatus] = useState<status>("idle");
  const [data, setData] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  async function fetchTodos() {
    try {
      setStatus("loading");
      const response = await api.get("/todos", {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data.todos);
      setStatus("success");
      setError("");
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) setToken(null);
    }
  }
  useEffect(() => {
    fetchTodos();
  }, []);
  return { status, data, error, fetchTodos };
};
