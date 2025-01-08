import { config as loadFunction } from "dotenv";

loadFunction();

const _config = {
  port: process.env.PORT,
  mongodbURI: process.env.DATABASE_URI,
  jwtSecret : process.env.JWT_SECRET,
  cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
  frontendDomain: process.env.FRONTEND_DOMAIN
};

export const config = Object.freeze(_config);
