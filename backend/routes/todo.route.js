import { Router } from "express";
import {
  addTodo,
  updateTodo,
  completeTodo,
  searchTodo,
  getTodos,
} from "../controllers/todo.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
const todoRouter = Router();
todoRouter.use(auth);
todoRouter.post("/", addTodo);
todoRouter.get("/", getTodos);
todoRouter.get("/search", searchTodo);
todoRouter.patch("/:id", updateTodo);
todoRouter.patch("complete/:id", completeTodo);

export default todoRouter;
