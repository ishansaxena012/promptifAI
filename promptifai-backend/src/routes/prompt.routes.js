import express from "express";
import { enhancePrompt } from "../controllers/prompt.controller.js";
import rateLimiter from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/enhance", rateLimiter, enhancePrompt);

export default router;
