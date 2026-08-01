import { z } from "zod";

export const signUpSchema = z.object({
    username: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
});

export const signInSchema = z.object({
    username: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const transferSchema = z.object({
    toUsername: z.email(),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
});

export type TransferInput = z.infer<typeof transferSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;




