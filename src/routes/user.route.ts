import express from "express";
import { editProfile, getUser, followUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/get-user/:username/:currentuser", getUser);
router.put("/edit-profile/:username", editProfile);
router.post("/follow-user/:username/:currentuser", followUser);

export default router;