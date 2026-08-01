import {Router} from "express";
import { authMiddleware } from "../middleware/auth.ts";
import {validate} from "../middleware/validation.ts";
import { createTransactionSchema } from "../schemas/transaction.Schema.ts";
import * as transactionController from "../controllers/transaction.controller.ts";
const router = Router();

/**
 * - POST /api/transaction/
 * - Create a new transaction
 * - Protected Route
 */

router.post("/",authMiddleware,validate(createTransactionSchema),transactionController.createTransactionController);
export default router;