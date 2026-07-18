import{Router} from "express";
import userRoutes from "./user.ts";
import accountRoutes from "./account.ts";


const router=Router();
router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);

export default router;