import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        email: string;
    };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    const authorization =
        req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            message: "Token manquant"
        });
    }

    const parts = authorization.split(" ");

    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer"
    ) {
        return res.status(401).json({
            message: "Format du token invalide"
        });
    }

    const token = parts[1];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({
            message: "JWT_SECRET non configuré"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            secret
        ) as {
            userId: number;
            email: string;
        };

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Token invalide ou expiré"
        });
    }
};