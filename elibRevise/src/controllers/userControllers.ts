import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { decodedToken, googleUsers, User } from "../types/userType";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import fs from "node:fs";
import { AuthRequest } from "../types/requestType";
import googleUser from "../models/googleUser";

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

  //checking where the user is already exist in Google Database Collection
  try {
    
    const isUserExist = await googleUser.findOne({email : email})
    if(isUserExist){
      return next(createHttpError(400,"Your email is already used for Google Login. Please Sign in with Google"))
    }

  } catch (error) {
    return next(createHttpError(500, `Error while getting user from Google Database collections ${error}`));
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
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  //Data validation
  if (!username || !email || !password) {
    return next(createHttpError(500, `All fields are required`));
  }

  //check user with email or username exist
  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    return next(
      createHttpError(500, `User doesn't exist with this username or email`)
    );
  }

  //password checking
  const isMatch = await bcrypt.compare(password, user.password);
  try {
    if (isMatch) {
      const token = await jwt.sign(
        { sub: user._id },
        config.jwtSecret as string,
        {
          expiresIn: "7d",
          algorithm: "HS256",
        }
      );

      res.status(200).json({
        accessToken: token,
      });
    } else {
      return next(createHttpError(401, `Incorrect Password`));
    }
  } catch (error) {
    return next(
      createHttpError(500, `Failed to generate access token. Error : ${error}`)
    );
  }
};

//Route for Profile
const uploadImage = async (req: Request, res: Response) => {
  const _req = req as AuthRequest;
  const userId = _req.userId;

  const profileImage = req.files as {
    [filename: string]: Express.Multer.File[];
  };
  if (profileImage) {
    const filename = profileImage.profileImage[0].filename;
    const imgMimeType = profileImage.profileImage[0].mimetype.split("/").at(-1);

    //now uploading to cloudinary
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads/" + filename
    );

    let completeProfileImage = filename;

    //configurations for cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: completeProfileImage,
      folder: "profile-images",
      format: imgMimeType,
    });

    completeProfileImage = uploadResult.secure_url;
    await fs.promises.unlink(filePath);

    const updateProfileImage = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        profileImgURL: completeProfileImage,
      }
    );
    res.status(200).json({
      result: "Profile Image Uploaded.",
      update: updateProfileImage,
    });
  }
};

//Route for update User
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userFullName, email, username } = req.body;

  const _req = req as AuthRequest;
  const id = _req.userId;

  const User = await userModel.findById({ _id: id });
  if (!User) {
    return next(createHttpError(404, `User Not Found!`));
  }

  const result = await userModel.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      userFullName: userFullName ? userFullName : User?.userFullName,
      email: email ? email : User?.email,
      username: username ? username : User?.username,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    result: result,
  });
};

//For updating users password
const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;
  const id = _req.userId;

  //Request fields
  const { currentPassword, updatedPassword } = req.body;

  const User = await userModel.findById({ _id: id });
  if (!User) {
    return next(createHttpError(404, `User Not Found!`));
  }

  //check for same password
  if (currentPassword === updatedPassword) {
    return next(
      createHttpError(
        400,
        `Password cannot be the same as the previous password!`
      )
    );
  }

  try {
    const hashedPassword = User.password;

    // current password verification
    const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
    if (isMatch) {
      //updatedPassword Hashing
      const hashedUpdatedPassword = await bcrypt.hash(updatedPassword, 10);

      //updating password in database
      await userModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          password: hashedUpdatedPassword,
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        message: "Password updated successfully",
      });
    } else {
      res.status(401).json({
        Error: "Current password is invalid",
      });
    }
  } catch (error) {
    return next(createHttpError(500, `Failed to update Password. ${error}`));
  }
};

//for registering and login via google Oauth
const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  const tokenGoogle = req.body.googleToken;

  //decoding google token
  const decoded = jwt.decode(tokenGoogle) as decodedToken;

  //checking user is already logged in via standard login
  const user = await userModel.findOne({ email: decoded.email });

  if (user) {
    return next(
      createHttpError(
        400,
        `Your email is already registered via standard login.`
      )
    );
  }

  //user creation and proceed to login
  const userFullName = {
    firstName: decoded.given_name,
    lastName: decoded.family_name,
  };

  //Finding user in googleLogin database collections
  const googleUserData = await googleUser.findOne({ email: decoded.email });

  if (!googleUserData) {
    try {
      await googleUser.create({
        userFullName: userFullName,
        profileImgURL: decoded.picture,
        email: decoded.email,
      });
    } catch (error) {
      return next(createHttpError(500, `Error while creating user ${error}`));
    }
  }


  console.log("Generating token...")
  //Generating JWT Token
  try {
    const token = await jwt.sign(
      { sub: googleUserData?._id },
      config.jwtSecret as string,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    res.status(200).json({
      AccessToken: token,
    });
  } catch (error) {
    return next(
      createHttpError(500, `Error while generating JWT Token. Error: ${error}`)
    );
  }
};

export {
  registerUser,
  loginUser,
  uploadImage,
  updateUser,
  updateUserPassword,
  googleLogin,
};
