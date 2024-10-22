import express from "express";
import { createPost, getPosts, likePost } from "../controllers/post.controller";

const router = express.Router();

router.post("/create-post", createPost);
router.get("/get-posts/:owner", getPosts);
router.post("/like-post/:postid/:username", likePost);

export default router;