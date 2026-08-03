import { z } from "zod";

const commonFields = {
    toAccountNumber: z
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
};

export const createTransactionSchema = z.object({
    ...commonFields,

    fromAccountNumber: z
        .string()
        .trim()
        .regex(/^\d{12}$/, "Account number must be exactly 12 digits"),
});

export const initialFundsSchema = z.object({
    ...commonFields,
});

export type CreateTransactionInput =
    z.infer<typeof createTransactionSchema>;

export type InitialFundsInput =
    z.infer<typeof initialFundsSchema>;