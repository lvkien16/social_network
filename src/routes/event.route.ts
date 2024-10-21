import express from "express";
import { createEvent, getEvents, followEvent } from "../controllers/event.controller";

const router = express.Router();

router.post("/create-event/:owner", createEvent);
router.get("/get-events/:owner", getEvents);
router.post("/follow-event/:eventid/:username", followEvent);

export default router;