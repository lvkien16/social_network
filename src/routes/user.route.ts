import express from "express";
import { getUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/get-user/:username/:currentuser", getUser);

export default router;