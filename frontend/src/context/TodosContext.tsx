import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/axiosInstances";
import type { status, Todo } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

type TodosContext=undefined | {
    data: Todo[];
    status: status
    error:string;
    fetchTodos: ()=>Promise<void>
}

const TodosContext=createContext<TodosContext>(undefined);

export const TodosProvider = ({children}:{children: React.ReactNode})=>{
      const { token, setToken } = useAuth();
      const [status, setStatus] = useState<status>("idle");
      const [data, setData] = useState<Todo[]>([]);
      const [error, setError] = useState("");
      async function fetchTodos() {
        try {
          if (status==='idle') setStatus('loading');
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
        if(status==='idle') fetchTodos();
      }, []);
    return (
        <TodosContext.Provider value={{data,status,error,fetchTodos}}>
            {children}
        </TodosContext.Provider>
    )
}

export const useTodos= ()=>{
    const TodosContextResolver=useContext(TodosContext);
    if (!TodosContextResolver) throw new Error('no TodosContext provided')
    return TodosContextResolver
}