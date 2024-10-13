import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./error";

export interface CustomRequest extends Request {
    user?: JwtPayload | object;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return next(errorHandler(401, "Access denied. No token provided"));
    }

    try {
        const secretKey = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secretKey) as JwtPayload & { [key: string]: any };
        if (decoded.user && typeof decoded.user === "object") {
            delete decoded.user.password;
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        return next(errorHandler(400, "Invalid token"));
    }
}

export default verifyToken;