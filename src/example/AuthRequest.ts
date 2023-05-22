import { check } from "express-validator";
import { showApiError } from "../middleware/AuthMiddleware";

export const loginRequest = [
    check('username').exists().isLength({ min: 4 }),
    check('password').exists().isLength({ min: 4 }),
    showApiError
];