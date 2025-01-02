import express, { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  uploadImage,
} from "../controllers/userControllers";
import multer from "multer";
import path from "node:path";

const userRouter = express.Router();

//file store local
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  //todo: set file limit from 30MB to 10MB
  limits: { fileSize: 3e7 }, //it's 30MB
});

userRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    msg: "I am here",
  });
});

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//for Profile Image Upload 
userRouter.patch(
  "/profileimg/:id",
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  uploadImage
);

export default userRouter;
