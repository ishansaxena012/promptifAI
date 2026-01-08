import { GoogleGenAI } from "@google/genai";
import { buildSystemInstruction } from "../utils/promptBuilder.js";

export const buildEnhancedPrompt = async (prompt) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp", // Update to latest model if "3-flash" fails
      contents: prompt,
      config: {
        systemInstruction: buildSystemInstruction(),
        generationConfig: {
        temperature: 0.1, // Low temp = strict adherence to rules
        maxOutputTokens: 1000,
        }
      },
    });

    // FIX: Remove the parenthesis '()'
    // response.text is a property in the new SDK, not a function
    if (response.text) {
        return response.text; 
    }
    
    // Fallback if text is null (e.g. safety blocks)
    throw new Error("No response text generated.");

  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};