import { Request, Response, NextFunction } from 'express';
import User from "../models/user.model";
import { errorHandler } from "../utils/error";
import bcryptjs from "bcryptjs";

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

export const editProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    const { name, email, emailVisibility, profilePicture, birthday, birthdayVisibility, biography, livesIn, livesInVisibility, status, statusVisibility, work, workVisibility, enterPassword } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return next(errorHandler(404, "User not found"));
        } else {
            const isMatch = await bcryptjs.compare(enterPassword, user.password);
            if (!isMatch) {
                return next(errorHandler(400, "The password is incorrect"));
            } else {
                const updateUser = await User.findOneAndUpdate({
                    username
                }, {
                    $set: {
                        name,
                        email,
                        emailVisibility,
                        profilePicture,
                        birthday,
                        birthdayVisibility,
                        biography,
                        livesIn,
                        livesInVisibility,
                        status,
                        statusVisibility,
                        work,
                        workVisibility
                    }
                }, { new: true });

                if (!updateUser) {
                    return next(errorHandler(500, "Failed to update user"));
                }
                const { password, ...rest } = updateUser.toObject();
                res.status(200).json(rest);
            }
        }
    } catch (error) {
        next(error);
    }
}

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
    const {username, currentuser} = req.params;
    try {
        const user = await User.findOne({username});
        if(!user) {
            return next(errorHandler(404, "User not found"));
        }
        const userIndex = user.followers.indexOf(currentuser);
        if(userIndex === -1){
            user.followers.push(currentuser);
        } else{
            user.followers.splice(userIndex, 1);
        }
        await user.save();
        res.status(200).json(user.followers);
    } catch (error) {
        next(error);
    }
}