import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token: string | undefined = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({
                message: "Access denied"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY!
        ) as JwtPayload;

        res.locals.userId = decoded.userId;

        next();

    } catch {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}