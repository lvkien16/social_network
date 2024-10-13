import { Request, Response, NextFunction } from 'express';
import User from "../models/user.model";
import { errorHandler } from "../utils/error";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, currentuser } = req.params;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        if (user && user.blocked && user.blocked.includes(currentuser)) {
            return next(errorHandler(403, "You are not authorized to view this user"));
        }
        if (user && user.username !== currentuser) {
            const { password: pass, blocked, ...rest } = user.toObject();
            res.status(200).json(rest);
            return;
        }

        const { password: pass, ...rest } = user.toObject();

        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}

export const editInformation = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    const { name, email, profilePicture, coverPicture, birthday, biography, livesIn, status, work } = req.body;
}