import {z} from "zod";

export const signUpSchema=z.object({
    username: z.email(),   
    password: z.string().min(6),
    firstname: z.string(),
    lastname: z.string()
});

export const signInSchema=z.object({
    username: z.email(),
    password:z.string().min(6)
});
