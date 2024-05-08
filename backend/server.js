import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
console.log(process.env.MONGO_URL);

//미들웨어
app.use(express.json()); //to parse req.body

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectMongoDB();
});
