"use client";
import { toast } from "sonner";
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo";
import { useState } from "react";
import { updateTodoStatus } from "@/actions/todos";
import { useTodo } from "@/components/providers/TodoProvider";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";

const KanbanBoard = () => {
  const { todos, completedTodos, setTodos, setCompletedTodos } = useTodo();
  const [showAddIcon, setShowAddIcon] = useState(false);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;

    // Source Logic
    if (source.droppableId === "Incomplete") {
      add = active[source.index];
      active.splice(source.index, 1);
      add.completed = true;
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
      add.completed = false;
    }

    // Destination Logic
    if (destination.droppableId === "Completed") {
      complete.splice(destination.index, 0, add);
    } else {
      active.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);

    const updatedStatusTodo = await updateTodoStatus(
      127,
      destination.droppableId === "Completed" ? true : false,
    );

    if (updatedStatusTodo.completed) {
      toast.success(`Todo "${add.todo}" completed!`);
    } else {
      toast.info(`Todo "${add.todo}" marked incomplete!`);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-12 pt-20">
        <div className="flex gap-9 max-w-[900px] min-h-[80vh]">
          <Droppable droppableId="Incomplete">
            {(provided) => (
              <div
                className="flex flex-col flex-1"
                onMouseEnter={() => setShowAddIcon(true)}
                onMouseLeave={() => setShowAddIcon(false)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="font-bold">Incomplete</h2>

                {todos.map((todo, i) => {
                  return (
                    <TodoCard key={todo.id.toString()} todo={todo} index={i} />
                  );
                })}

                <div className="mt-6 flex justify-center">
                  {showAddIcon && <AddTodo />}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="Completed">
            {(provided) => (
              <div
                className="flex flex-col flex-1"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="font-bold">Completed</h2>

                {completedTodos.map((todo, i) => {
                  return (
                    <TodoCard key={todo.id.toString()} todo={todo} index={i} />
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
