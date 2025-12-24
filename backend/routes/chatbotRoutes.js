import express from "express";
import upload from "../middleware/upload.js";
import { sendMessage, getHistory } from "../controllers/chatbotController.js";

const router = express.Router();

router.get("/history/:sessionId", getHistory);
router.post("/send", upload.single("voiceFile"), sendMessage);

export default router;
