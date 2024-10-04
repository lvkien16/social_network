import express from "express";
import { login, refreshAccessToken, register } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-tokem", refreshAccessToken);

export default router;