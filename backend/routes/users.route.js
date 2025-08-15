import { Router } from "express";
import {
  deleteUserController,
  getUserInfoController,
  loginController,
  signoutController,
  signupController,
  updateUserController,
} from "../controllers/users/users.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
const usersRouter = Router();

usersRouter.post("/login", loginController);
usersRouter.post("/signup", signupController);
usersRouter.get("/signout", signoutController);
usersRouter.delete('/',auth,deleteUserController);
usersRouter.patch('/',auth,updateUserController);
usersRouter.get('/',auth,getUserInfoController)
export default usersRouter;
