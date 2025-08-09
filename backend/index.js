import express from "express";
import cors from "cors";
import { PORT, FRONTEND_URL, IS_PRODUCTION } from "./config/env.js";
import chalk from "chalk";
import morgan from "morgan";
import {dbConnection} from "./config/dbConnection.js";
import usersRouter from "./routes/users.route.js";
import todoRouter from "./routes/todo.route.js";
import refreshRouter from "./routes/refresh.route.js";
import { ErrorHandler } from "./middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: '*', 
               credentials: true ,
              }));
app.use(express.json());
app.use(cookieParser());
app.use("/users", usersRouter);
app.use("/todos", todoRouter);
app.use("/refresh", refreshRouter);
app.use(ErrorHandler);

if (!IS_PRODUCTION){
  //start server
  app.listen(PORT, async () => {
  console.log(
    chalk.cyan.bold("server is listening on port ") +
      chalk.bgCyan.white.bold(PORT)
  );
  await dbConnection()
});
}
export default app;