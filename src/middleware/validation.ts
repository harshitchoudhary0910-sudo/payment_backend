import {z} from "zod";
import type{
    Request,
    Response,
    NextFunction
} from "express";

export function validate(schema:z.ZodType){
    return (req:Request,res:Response,next:NextFunction)=>{
        const result = schema.safeParse(req.body);

if (!result.success) {
    const errors = result.error.issues.map(issue => ({
        field: issue.path.join("."),
        message: issue.message
    }));
    res.status(400).json({ errors });
    return;
}

        req.body = result.data;

        next();

    }
};