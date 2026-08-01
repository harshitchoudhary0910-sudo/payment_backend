import { z } from "zod";
export const createTransactionSchema = z.object({
    toAccountNumber: z
        .string()
        .trim()
        .regex(/^\d{12}$/, "Account number must be exactly 12 digits"),
    fromAccountNumber: z
        .string()
        .trim()
        .regex(/^\d{12}$/, "Account number must be exactly 12 digits"),
    amount: z
        .coerce
        .number()
        .positive("Amount must be greater than 0"),

    idempotencyKey: z
        .string()
        .uuid("Invalid idempotency key"),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;