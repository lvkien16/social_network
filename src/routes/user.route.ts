import express from "express";
import { editProfile, getUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/get-user/:username/:currentuser", getUser);
router.put("/edit-profile/:username", editProfile);

export default router;