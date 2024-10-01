import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import sendMail from "../mailers/index";
import User from "../models/user.model";
import { errorHandler } from "../utils/error";
import { LocalStorage } from "node-localstorage";

export const registerCode = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const localStoragePath = "./src/scratch";
  const localStorage = new LocalStorage(localStoragePath);
  const verificationCode = crypto.randomInt(1000, 10000);

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(errorHandler(400, "User already exists"));
  }

  const otpData = localStorage.getItem("otpData");
  if (otpData) {
    const parsedOtpData = JSON.parse(otpData);
    const now = new Date();
    
    if (parsedOtpData.email === email && parsedOtpData.expiry > now.getTime()) {
      return next(errorHandler(400, "Please wait for 3 minutes before requesting another code"));
    }
  }

  const saveOtpWithExpiry = () => {
    const now = new Date();
    const otpObject = {
      otp: verificationCode,
      email: email,
      expiry: now.getTime() + 3 * 60 * 1000,
    };
    localStorage.setItem("otpData", JSON.stringify(otpObject));
  };

  const deleteDataAfterExpiry = () => {
    setTimeout(() => {
      localStorage.removeItem("otpData");
    }, 3 * 60 * 1000);
  };

  saveOtpWithExpiry();
  deleteDataAfterExpiry();

  try {
    await sendMail(
      email,
      "Account registration verification code",
      "Your code: " + verificationCode
    );
    res.status(200).json({ message: "Verification code sent" });
  } catch (error) {
    next(error);
  }
};
