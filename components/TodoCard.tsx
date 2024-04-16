"use client";
import { toast } from "sonner";
import { user } from "@/lib/constants";
import { useTodo } from "./providers/TodoProvider";
import { deleteTodo } from "@/actions/todos";
import { useRef, useState, useEffect } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Draggable } from "@hello-pangea/dnd";

interface TodoCard {
  todo: Todo;
  index: number;
}

const TodoCard = ({ todo, index }: TodoCard) => {
  const { setTodos, setCompletedTodos } = useTodo();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.todo);
  const [isEditIconShown, setIsEditIconShown] = useState(false);
  const [isDeleteIconShown, setIsDeleteIconShown] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setTodos((todos) =>
      todos.map((t) => (t.id === todo.id ? { ...t, todo: editedTodo } : t)),
    );
    setIsEditing(false);
    toast.success("Todo edited successfully!");
  };

  const handleDelete = async () => {
    if (todo.completed) {
      setCompletedTodos((todos) => todos.filter((t) => t.id !== todo.id));
    }
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));

    const deletedTodo = await deleteTodo(127); // Todo ID from user ID = 7, Hardcoding because any Todo ID wont work. Has to exist in their DB

    if (deletedTodo.isDeleted) {
      toast.success("Todo deleted successfully!");
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <Draggable
      draggableId={todo.id.toString()}
      key={todo.id.toString()}
      index={index}
    >
      {(provided) => (
        <Card
          className="relative p-5 cursor-grab shadow-sm mt-8"
          onMouseEnter={() => {
            {
              setIsEditIconShown(true);
              setIsDeleteIconShown(true);
            }
          }}
          onMouseLeave={() => {
            setIsEditIconShown(false);
            setIsDeleteIconShown(false);
          }}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <CardTitle className="text-[20px] flex items-center justify-between gap-2">
            {isEditing ? (
              <>
                <input
                  type="text"
                  ref={inputRef}
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                  className="bg-primary-foreground outline-none flex-1 rounded-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSave();
                    }
                  }}
                />
                <button onClick={handleSave}>
                  <CheckIcon className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>{todo.todo}</>
            )}
            {isEditIconShown && !isEditing && !todo.completed && (
              <button onClick={handleEditClick}>
                <PencilIcon className="h-4 w-4" />
              </button>
            )}
          </CardTitle>
          <CardDescription className="flex items-center justify-between mt-[10px] text-gray-400 dark:text-gray-500 font-bold">
            <span>
              Created by{" "}
              <span className="text-gray-500 dark:text-gray-400">
                {user.name}
              </span>
            </span>
            <Avatar className="h-5 w-5">
              <AvatarImage src={user.imageUrl} alt={`@${user.name}`} />
              <AvatarFallback>OL</AvatarFallback>
            </Avatar>
          </CardDescription>
          {isDeleteIconShown && !isEditing && (
            <button
              onClick={handleDelete}
              className="absolute -right-1 -top-[6px] p-[1px] bg-destructive text-destructive-foreground rounded-full"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </Card>
      )}
    </Draggable>
  );
};

export default TodoCard;
