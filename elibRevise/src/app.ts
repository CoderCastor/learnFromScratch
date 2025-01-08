import express from "express";
import userRouter from "./router/userRouter";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cors from 'cors'
import { config } from "./config/config";

const app = express();

app.use(
    cors({
      origin: config.frontendDomain,
    })
  );
  

app.use(express.json())

app.use(cors())

app.use("/api/users", userRouter);

app.use(globalErrorHandler)



export default app;


