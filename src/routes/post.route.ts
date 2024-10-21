import express from "express";
import { createPost, getPosts } from "../controllers/post.controller";

const router = express.Router();

router.post("/create-post", createPost);
router.get("/get-posts/:owner", getPosts);

export default router;