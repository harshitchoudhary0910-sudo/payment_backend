import{Router} from "express";
import userRoutes from "./auth.ts";
import accountRoutes from "./account.ts";
import transactionRoutes from "./transaction.ts";


const router=Router();
router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);
router.use("/transactions", transactionRoutes);

export default router;