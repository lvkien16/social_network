import express from "express";
import { registerCode } from "../controllers/mailer.controller";

const router = express.Router();

router.post("/register", registerCode);

export default router;