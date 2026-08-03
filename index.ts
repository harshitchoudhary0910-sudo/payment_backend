import express from "express";
import router from "./src/routes/index.ts";
import { connectToDatabase } from "./src/config/db.ts";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { recoverPendingTransactions } from "./src/jobs/transactionRecovery.ts";

dotenv.config();
const app=express();



await connectToDatabase();


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1",router);

setInterval(async () => {
    await recoverPendingTransactions();
}, 5 * 60 * 1000); // Run every 5 minutes






app.listen(3000);
