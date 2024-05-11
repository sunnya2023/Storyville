import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
// console.log(process.env.MONGO_URL);

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_API_KEY,
  api_secret: process.env.cloud_API_SECRET,
});

//미들웨어
app.use(express.json()); //to parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data(urlencoded)
app.use(cookieParser()); //쿠키 파싱 미들웨어

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectMongoDB();
});
