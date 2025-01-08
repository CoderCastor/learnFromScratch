import express, { Request, Response } from "express";
import {
  googleLogin,
  loginUser,
  registerUser,
  updateUser,
  updateUserPassword,
  uploadImage,
} from "../controllers/userControllers";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authentication";

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

//for registering user
userRouter.post("/register", registerUser);

//register and login user with google
userRouter.post("/google-login", googleLogin);

//for login user
userRouter.post("/login", loginUser);

//for Profile Image Upload 
userRouter.patch(
  "/profileimg",
  authenticate,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  uploadImage
);

//for updating information of user
userRouter.patch('/update-user',authenticate,updateUser)

//for updating password of user
userRouter.patch('/update-user-password',authenticate,updateUserPassword)

export default userRouter;
