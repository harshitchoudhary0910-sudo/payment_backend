import { Router } from "express";
import { validate } from "../middleware/validation.ts";
import { signUpSchema, signInSchema } from "../schemas/user.Schema.ts"
import { UserModel, AccountModel } from "../models/models.ts";
import type { SignUpInput, SignInInput } from "../schemas/user.Schema.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const router = Router();

router.post("/signup", validate(signUpSchema), async (req, res) => {
    try {
        const { username, password, firstname, lastname } = req.body as SignUpInput;
        const userExists = await UserModel.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username,
            password: hashedPassword,
            firstname,
            lastname
        });
        const newAccount=await AccountModel.create({
            userId: newUser._id,
            balance: 1000
        })

        res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
});

router.post("/signin", validate(signInSchema), async (req, res) => {

    try{

    const { username, password } = req.body as SignInInput;
    const userExists = await UserModel.findOne({ username });
    if (!userExists || !userExists.password) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userID: userExists._id }, process.env.SECRET_KEY as string, { expiresIn: "1h" });

    res.cookie('auth_token', token, {
        httpOnly: true,
        sameSite: 'strict',

    });

    res.status(200).json({ message: "Sign in successful", userID: userExists._id });
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing in"});
}
});


export default router;








