import express from "express";
import router from "./routes/index.ts";
import { connectToDatabase } from "./db.ts";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app=express();



await connectToDatabase();


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1",router);





app.listen(3000);
