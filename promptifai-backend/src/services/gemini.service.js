import { GoogleGenAI } from "@google/genai";
import { buildSystemInstruction } from "../utils/promptBuilder.js";

export const buildEnhancedPrompt = async (prompt) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        systemInstruction: buildSystemInstruction(),
        generationConfig: {
        temperature: 0.1, // Low temp = strict adherence to rules
        maxOutputTokens: 1000,
        }
      },
    });

    if (response.text) {
        return response.text; 
    }
    
    throw new Error("No response text generated.");

  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};