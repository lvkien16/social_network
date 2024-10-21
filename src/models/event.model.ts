import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        attendees: {
            type: String,
            required: true,
        },
        followers: {
            type: Array,
            default: [],
        },
        likes: {
            type: Array,
            default: [],
        },
        image: {
            type: String,
            default: "",
        }
    }, { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;