import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error";
import jwt from "jsonwebtoken";
import { LocalStorage } from "node-localstorage";

interface IRegister {
    name: string;
    email: string;
    password: string;
    otp: string;
}

interface IOtpData {
    otp: string;
    email: string;
    expiry: number;
}

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password, otp }: IRegister = req.body;

    const localStoragePath = "./src/scratch";
    const localStorage = new LocalStorage(localStoragePath);

    const otpData = localStorage.getItem("otpData");
    console.log(otpData);
    if(otpData){
        const parsedOtpData = JSON.parse(otpData);
        console.log(parsedOtpData);
        if(parsedOtpData.email !== email || parsedOtpData.otp != otp){
            return next(errorHandler(400, "Invalid OTP"));
        }
    }
    else if(!name || !email || !password) {
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
        const existingUser = await User.findOne({email: email});
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