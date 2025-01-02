import mongoose from "mongoose";
import { User, userFullName } from "../types/userType";

const userFullNameSchema = new mongoose.Schema<userFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
});

const userSchema = new mongoose.Schema<User>({
  userFullName: {
    type: userFullNameSchema,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type : String,
    required : true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  profileImgURL:{
    type: String,
    default: ""
  }
});

export default mongoose.model<User>("User", userSchema);
