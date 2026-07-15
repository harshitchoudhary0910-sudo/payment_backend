import {Router} from "express";
import {validate} from "../middleware/validation.ts";
import {signUpSchema,signInSchema} from "../schemas/user.Schema.ts"
const router=Router();


router.post("/signUp",validate(signUpSchema),async(req,res) =>{
    


});