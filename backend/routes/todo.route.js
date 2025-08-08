import { Router } from "express";
import {
  addTodo,
  updateTodo,
  completeTodo,
  searchTodo,
  getTodos,
  deleteTodo
} from "../controllers/todo.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
const todoRouter = Router();
todoRouter.use(auth);
todoRouter.post("/", addTodo);
todoRouter.get("/", getTodos);
todoRouter.get("/search", searchTodo);
todoRouter.patch("/", updateTodo);
todoRouter.patch("/complete", completeTodo);
todoRouter.delete('/',deleteTodo)
export default todoRouter;
