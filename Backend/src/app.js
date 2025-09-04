import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors"
import userRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/courseRoute.js";

const app=express();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/course",courseRouter)
const Port=process.env.PORT

app.listen(Port,()=>{
    console.log(`Port runing on ${Port}`)
    connectDb()
})