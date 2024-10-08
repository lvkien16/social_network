import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        visibility: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            default: [],
        },
        likes: {
            type: Array,
            default: [],
        },
    }, { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;