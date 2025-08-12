import { Router } from "express";
import { refreshToken } from "../controllers/refresh/refresh.controller.js";

const refreshRouter = Router();

refreshRouter.get("/", refreshToken);

export default refreshRouter;
