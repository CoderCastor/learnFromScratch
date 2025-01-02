import express from "express";
import userRouter from "./router/userRouter";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();
app.use(express.json())

app.use("/api/users", userRouter);

app.use(globalErrorHandler)



export default app;


