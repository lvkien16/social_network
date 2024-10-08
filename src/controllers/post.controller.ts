import { Request, Response, NextFunction } from "express";
import Post from "../models/post.model";
import { errorHandler } from "../utils/error";

interface IPost {
    type: string;
    owner: string;
    content?: string;
    visibility: string;
    images?: string[];
    likes?: string[];
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { type, owner, content, visibility, images, likes }: IPost = req.body;

    try {
        const post = new Post({
            type,
            owner,
            content,
            visibility,
            images,
            likes,
        });

        await post.save();

        res.status(201).json(post);
        
    } catch (error) {
        next(error);
    }
}