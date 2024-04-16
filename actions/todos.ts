import { user } from "@/lib/constants";

const BASE_URL = "https://dummyjson.com/todos";

const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  next: {
    revalidate: 0, // Opt-out from default next caching.
  },
};

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/user/${user.id}`, fetchOptions);
  const data = await response.json();

  return data.todos;
};

export const addTodo = async (todo: string): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/add`, {
    ...fetchOptions,
    method: "POST",
    body: JSON.stringify({
      todo,
      userId: user.id,
      completed: false,
    }),
  });

  const data = await response.json();
  return data;
};

interface DeletedTodo extends Todo {
  isDeleted: boolean;
  deletedOn: string;
}

export const deleteTodo = async (id: number): Promise<DeletedTodo> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
};

export const updateTodoStatus = async (
  id: number,
  completed: boolean,
): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    ...fetchOptions,
    method: "PUT",
    body: JSON.stringify({
      completed,
    }),
  });

  const data = await response.json();
  return data;
};
