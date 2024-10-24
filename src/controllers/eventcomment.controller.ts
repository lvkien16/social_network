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

        if (!comments) {
            return next(errorHandler(404, "No comments found"));
        }

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

export const getReplyComments = async (req: Request, res: Response, next: NextFunction) => {
    const { commentid } = req.params;

    try {
        const replyComments = await EventComment.find({ replyingTo: commentid }).sort({ createdAt: -1 });

        if (!replyComments) {
            return next(errorHandler(404, "No reply comments found"));
        }

        res.status(200).json(replyComments);

    } catch (error) {
        next(error);
    }
}

export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentid, username } = req.params;
    try {
        const eventComment = await EventComment.findById(commentid);

        if (!eventComment) {
            return next(errorHandler(404, "Event's comment not found"));
        }
        const userIndex = eventComment.likes.indexOf(username);
        if (userIndex === -1) {
            eventComment.likes.push(username);
        } else {
            eventComment.likes.splice(userIndex, 1);
        }
        await eventComment.save();
        res.status(200).json(eventComment.likes);
    } catch (error) {
        next(error);
    }
}