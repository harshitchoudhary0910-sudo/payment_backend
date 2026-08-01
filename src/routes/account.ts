import { Router} from "express";
import * as accountController from "../controllers/account.controller.ts";
import { authMiddleware } from "../middleware/auth.ts";
const router = Router();



/**
 * - POST /api/accounts/
 * - Create a new account
 * - Protected Route
 */
router.post("/", authMiddleware, accountController.createAccountController);


/**
 * - GET /api/accounts/
 * - Get all accounts of the logged-in user
 * - Protected Route
 */
router.get("/", authMiddleware, accountController.getUserAccountsController);



export default router;


