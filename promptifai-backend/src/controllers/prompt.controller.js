import { buildEnhancedPrompt } from "../services/gemini.service.js";
import crypto from "crypto";

export const enhancePrompt = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Input validation
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Prompt is required and must be a non-empty string"
        }
      });
    }

    // Length guard 
    const MAX_PROMPT_LENGTH = 2000;
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return res.status(413).json({
        success: false,
        error: {
          message: "Prompt is too long"
        }
      });
    }

    const requestId = crypto.randomUUID();

    //  Call service layer
    const enhancedPrompt = await buildEnhancedPrompt(prompt.trim());

    return res.status(200).json({
      success: true,
      requestId,
      data: {
        enhancedPrompt
      }
    });
  } catch (error) {
    next(error);
  }
};
