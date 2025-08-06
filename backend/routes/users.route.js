import { Router } from "express";
import {
  loginController,
  signoutController,
  signupController,
} from "../controllers/users.controller.js";
const usersRouter = Router();

usersRouter.post("/login", loginController);
usersRouter.post("/signup", signupController);
usersRouter.get("/signout", signoutController);

export default usersRouter;
