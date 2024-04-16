import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTodo } from "./providers/TodoProvider";
import { useState } from "react";
import { user } from "@/lib/constants";
import { Input } from "./ui/input";
import { addTodo } from "@/actions/todos";
import { toast } from "sonner";

const AddTodo = () => {
  const { setTodos } = useTodo();

  const [newTodo, setNewTodo] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((todos) => [
      ...todos,
      { id: Date.now(), todo: newTodo, completed: false, userId: user.id },
    ]);
    setIsOpen(false);

    const addedTodo = await addTodo(newTodo);

    if (addedTodo.id === 151) {
      // DummyJson sends id: 151 when adding a new todo
      toast.success(`Todo "${newTodo}" added successfully`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          Add Todo
          <PlusIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Add a new Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddTodo} className="flex gap-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            required
          />
          <Button type="submit" variant="outline" size="lg">
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodo;
