"use client";
import {
  useState,
  ReactNode,
  useContext,
  useEffect,
  createContext,
} from "react";
import { getAllTodos } from "@/actions/todos";

interface TodoContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoContext = createContext<TodoContextType>(
  {} as TodoContextType,
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const allTodos = await getAllTodos();

    const todos = allTodos.filter((todo) => !todo.completed);
    const completedTodos = allTodos.filter((todo) => todo.completed);

    setTodos(todos);
    setCompletedTodos(completedTodos);
    console.log(allTodos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        completedTodos,
        setCompletedTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};
