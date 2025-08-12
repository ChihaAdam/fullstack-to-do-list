import { Router } from "express";
import {
  deleteUserController,
  loginController,
  signoutController,
  signupController,
} from "../controllers/users/users.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
const usersRouter = Router();

usersRouter.post("/login", loginController);
usersRouter.post("/signup", signupController);
usersRouter.get("/signout", signoutController);
usersRouter.delete('/',auth,deleteUserController);
export default usersRouter;
