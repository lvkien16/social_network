import EventComment from "../models/eventcomment.model";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/error";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { eventid, username } = req.params;
    const { comment, replyingTo, profilePicture, name } = req.body;

    try {
        const eventComment = new EventComment({
            eventId: eventid,
            username,
            comment,
            replyingTo,
            name,
            profilePicture
        });

        await eventComment.save();

        res.status(201).json(eventComment);
    } catch (error) {
        next(error);
    }
}

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
    const { eventid } = req.params;

    try {
        const comments = await EventComment.find({ eventId: eventid }).sort({ createdAt: -1 });

        if(!comments) {
            return next(errorHandler(404, "No comments found"));
        }

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}