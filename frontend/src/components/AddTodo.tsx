import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";
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
import type { TodoRaw } from "@/types/types";
import { useAddTodo } from "@/hooks/useFetch";
function AddTodo({fetchTodos}:{fetchTodos:()=>Promise<void>}) {
  const {addTodo}=useAddTodo(fetchTodos)
  const [todo,setTodo]=useState<TodoRaw>({title:'',description:''});
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
    setTodo({title:'',description:''})
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
          <div className={titleLength>50?'text-red-600':''}>{titleLength}/50</div>
          <Label htmlFor="description">description</Label>
          <Textarea rows={4}  className="resize-none field-sizing-fixed"  id="description" onChange={handleDescriptionChange}></Textarea>
          <div className={descriptionLength>500?'text-red-600':''}>{descriptionLength}/500</div>
        </DialogHeader>
        <DialogFooter className="max-sm:flex max-sm:w-full max-sm:flex-col">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={!isValid} onClick={handleSubmit}>add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddTodo;
