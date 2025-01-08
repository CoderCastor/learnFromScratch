import mongoose from "mongoose";
import { googleUsers, userFullName } from "../types/userType";

const userFullNameSchema = new mongoose.Schema<userFullName>({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
  });
  
  const userSchema = new mongoose.Schema<googleUsers>({
    userFullName: {
      type: userFullNameSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImgURL:{
      type: String,
      default: ""
    }
  });

  export default mongoose.model<googleUsers>("googleUser", userSchema);