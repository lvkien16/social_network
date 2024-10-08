import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error";
import jwt from "jsonwebtoken";
import { LocalStorage } from "node-localstorage";

interface IUser {
    name?: string;
    email: string;
    password: string;
    otp?: string;
}

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password, otp }: IUser = req.body;

    const localStoragePath = "./src/scratch";
    const localStorage = new LocalStorage(localStoragePath);

    const otpData = localStorage.getItem("otpData");
    if (otpData) {
        const parsedOtpData = JSON.parse(otpData);
        if (parsedOtpData.email !== email || parsedOtpData.otp != otp) {
            return next(errorHandler(400, "Invalid OTP"));
        }
    }
    else if (!name || !email || !password) {
        return next(errorHandler(400, "Something went wrong"));
    } else {
        return next(errorHandler(400, "Invalid OTP"));
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashPassword,
    });


    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return next(errorHandler(400, "User with this email already exists"));
        }
        await user.save();
        await user.updateOne({ $set: { username: user._id } });
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        next(errorHandler(500, "An unexpected error occurred"));
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password }: IUser = req.body;


    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return next(errorHandler(400, "The email or password is incorrect"));
        }

        const token = jwt.sign({ user: user }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });

        const refreshToken = jwt.sign({user: user}, process.env.JWT_SECRET as string,{
            expiresIn: "7d"
        });

        const {password: pass, ...rest} = user.toObject();

        res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3600000,
            })
            .cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 604800000,
            })
            .json({ rest });
    } catch (error) {
        next(error);
    }
}

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refresh_token;

    if(!refreshToken){
        return next(errorHandler(401, "No refresh token provided"));
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET as string);
        const newAccessToken = jwt.sign({ user: decoded }, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });

        res.status(200).cookie("access_token",newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000,
        })
        .json({ message: "Access token refreshed successfully" });
    } catch (error) {
        
    }
}