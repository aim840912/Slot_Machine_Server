// ! example
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.header('Authorization')) {
        return res.status(401).send('unauthorized');
    }

    next();
}

export function showApiError(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}