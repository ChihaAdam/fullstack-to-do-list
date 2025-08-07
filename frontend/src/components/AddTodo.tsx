import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState, type ChangeEvent } from "react";
import type { TodoToAdd } from "@/types/types";
import { useAddTodo } from "@/hooks/useFetch";
function AddTodo() {
  const {addTodo}=useAddTodo()
  const [todo,setTodo]=useState<TodoToAdd>({title:'',description:''});
  const titleLength=todo.title.length;
  const descriptionLength=todo.description.length;
  const isValid=titleLength>=1 && titleLength<=50 && descriptionLength<=500
  const handleTitleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setTodo({...todo,title:e.target.value.trim()})
  }
    const handleDescriptionChange=(e:ChangeEvent<HTMLTextAreaElement>)=>{
    setTodo({...todo,description:e.target.value.trim()})
  }
  const handleSubmit=async ()=>{
    await addTodo(todo);
    toast('todo has been created . refresh to see it')
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-10 right-10 rounded-full cursor-pointer shadow-lg p-2 size-fit"
          aria-label="Add"
        >
          <Plus className="size-8 aspect-square dark:text-black" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>add a new todo</DialogTitle>
        <DialogHeader>
          <Label htmlFor="title">title</Label>
          <Input id="title" onChange={handleTitleChange}></Input>
          <Label htmlFor="description">title</Label>
          <Textarea className="resize-none" id="description" onChange={handleDescriptionChange}></Textarea>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button disabled={!isValid} onClick={handleSubmit}>add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTodo;
