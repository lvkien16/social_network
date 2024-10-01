import { Request, Response, NextFunction } from "express";

interface ICustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  statusCode: number,
  message: string
): ICustomError => {
  const error: ICustomError = new Error(message) as ICustomError;
  error.statusCode = statusCode;
  return error;
};

export const errorMiddleware = (
  error: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(error.statusCode || 500).json({
    message: error.message || "An unexpected error occurred",
  });
};
