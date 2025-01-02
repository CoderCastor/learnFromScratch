import { config } from "./src/config/config";
import { Request, Response } from "express";
import connectDB from "./src/config/db";
import app from "./src/app";



const startServer = async () => {
  const port = config.port || 4000;

  //connection with Database
  await connectDB();

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "I am Running",
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on PORT : ${port}`);
  });
};


startServer()