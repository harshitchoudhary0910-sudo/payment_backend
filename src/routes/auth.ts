import { Router } from "express";
import { validate } from "../middleware/validation.ts";
import { signUpSchema, signInSchema } from "../schemas/user.Schema.ts";
import { signUpController, signInController } from "../controllers/auth.controllers.ts";




const router = Router();

router.post("/signup", validate(signUpSchema), signUpController);
router.post("/signin", validate(signInSchema), signInController);
export default router;




