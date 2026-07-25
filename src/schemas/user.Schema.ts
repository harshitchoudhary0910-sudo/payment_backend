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

export const transferSchema=z.object({
    toUsername: z.string().email(),
    amount: z.number().positive()
})
export type TransferInput=z.infer<typeof transferSchema>    
export type SignUpInput=z.infer<typeof signUpSchema>
export type SignInInput=z.infer<typeof signInSchema>


