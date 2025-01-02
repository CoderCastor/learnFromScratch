import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { User } from "../types/userType";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import path from 'node:path'
import cloudinary from "../config/cloudinary";
import fs from 'node:fs'

//Route for Register
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userFullName, email, username, password } = req.body;

  //data input validation
  if (!userFullName || !email || !password || !username) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  //database call
  try {
    const user = await userModel.findOne({
      $or: [{ email: email }, { username: username }],
    }); //we can also write as userModel.findOne({email}) because key value pairs are same
    if (user?.email == email) {
      const error = createHttpError(400, "User already exists with this email");
      return next(error);
    }
    if (user?.username == username) {
      const error = createHttpError(
        400,
        "User already exists with this username"
      );
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, `Error while getting user ${error}`));
  }

  //Password Hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: User;
  try {
    newUser = await userModel.create({
      userFullName: userFullName,
      email: email,
      username: username,
      password: hashedPassword,
    });
  } catch (err) {
    return next(
      createHttpError(500, `Error While registering user. Error: ${err}`)
    );
  }

  //Generating JWT Token
  try {
    const token = await jwt.sign(
      { sub: newUser._id },
      config.jwtSecret as string,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    res.status(201).json({
      AccessToken: token,
    });
  } catch (error) {
    return next(
      createHttpError(500, `Error while generating JWT Token. Error: ${error}`)
    );
  }
};

//Route for Login
const loginUser = async(req:Request,res:Response,next:NextFunction) => {

    const { username , email , password } = req.body

    //Data validation
    if(!username || !email || !password){
        return next(createHttpError(500,`All fields are required`))
    }

    //check user with email or username exist
    const user = await userModel.findOne({$or: [{ username:username },{email:email}]})

    if(!user){
        return next(createHttpError(500,`User doesn't exist with this username or email`))
    }

    //password checking
    const isMatch = await bcrypt.compare(password,user.password)
    try {
        if(isMatch){
            const token = await jwt.sign({ sub : user._id },config.jwtSecret as string,{
                expiresIn: "7d",
                algorithm: "HS256"
            })

            res.status(200).json({
                accessToken : token
            })
        }else{
            return next(createHttpError(401,`Incorrect Password`))
        }

    } catch (error) {
        return next(createHttpError(500,`Failed to generate access token. Error : ${error}`))
    }
}

//Route for Profile 
const uploadImage = async(req:Request,res:Response) => {

  const userId = req.params.id

  const profileImage = req.files as { [filename: string]: Express.Multer.File[] };
  if(profileImage){
    const filename = profileImage.profileImage[0].filename;
    const imgMimeType = profileImage.profileImage[0].mimetype.split('/').at(-1);

    //now uploading to cloudinary
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads/" + filename
    );

    let completeProfileImage = filename;

    //configurations for cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath,{
      filename_override : completeProfileImage,
      folder: "profile-images",
      format: imgMimeType
    })

    completeProfileImage = uploadResult.secure_url;
    await fs.promises.unlink(filePath)
    
    const updateProfileImage = await userModel.findByIdAndUpdate({_id:userId},{
      profileImgURL:completeProfileImage
    })
    res.status(200).json({
      result:"Profile Image Uploaded.",
      update:updateProfileImage
    })
  }

}

export { registerUser,loginUser,uploadImage };
