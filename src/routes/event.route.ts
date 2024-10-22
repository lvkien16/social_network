import express from "express";
import { createEvent, getEvents, followEvent, likeEvent } from "../controllers/event.controller";

const router = express.Router();

router.post("/create-event/:owner", createEvent);
router.get("/get-events/:owner", getEvents);
router.post("/follow-event/:eventid/:username", followEvent);
router.post("/like-event/:eventid/:username", likeEvent);

export default router;