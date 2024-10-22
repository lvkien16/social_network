import { Request, Response, NextFunction } from "express";
import Post from "../models/post.model";
import { errorHandler } from "../utils/error";
import User from "../models/user.model";

interface IPost {
    owner: string;
    content?: string;
    visibility: string;
    images?: string[];
    likes?: string[];
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { owner, content, visibility, images, likes }: IPost = req.body;

    try {
        const post = new Post({
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

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { owner } = req.params;
    try {
        const posts = await Post.find({ owner });
        if (!posts.length) {
            return next(errorHandler(404, "No posts found"));
        }

        const postsToReturn = await Promise.all(posts.map(async (post) => {
            const user = await User.findOne({ username: post.owner });
            if(!user) {
                return next(errorHandler(404, "Cannot find the owner of this post"));
            }
            return {
                ...post.toObject(), profilePicture: user.profilePicture, name: user.name
            };
        }));

        res.status(200).json(postsToReturn);
    } catch (error) {
        next(error);
    }
}

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
    const {postid, username} = req.params;
    try {
        const post = await Post.findById(postid);
        if(!post) {
            return next(errorHandler(404, "Post not found"));
        }
        const userIndex = post.likes.indexOf(username);
        if(userIndex === -1){
            post.likes.push(username);
        } else{
            post.likes.splice(userIndex, 1);
        }
        await post.save();
        res.status(200).json(post.likes);
    } catch (error) {
        next(error);
    }
}