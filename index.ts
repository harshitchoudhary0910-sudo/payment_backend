import express from "express";
import router from "./routes/index.ts";
import { connectToDatabase } from "./db.ts";
const app=express();

await connectToDatabase();
app.use(express.json());



app.listen(3000);
