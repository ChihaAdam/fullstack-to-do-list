import express from "express";
import cors from "cors";
import { PORT, FRONTEND_URL } from "./config/env.js";
import chalk from "chalk";
import morgan from "morgan";
import dbConnection from "./config/dbConnection.js";
import usersRouter from "./routes/users.route.js";
import todoRouter from "./routes/todo.route.js";
import refreshRouter from "./routes/refresh.route.js";
import { ErrorHandler } from "./middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from "./swagger.js";

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(dbConnection);
app.use(morgan("dev"));
app.use(cors({ origin: FRONTEND_URL, 
               credentials: true ,
              }));
app.use(express.json());
app.use(cookieParser());
app.use("/users", usersRouter);
app.use("/todos", todoRouter);
app.use("/refresh", refreshRouter);
app.use(ErrorHandler);

export default app
