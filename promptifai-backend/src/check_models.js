// check_models.js
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function checkModels() {
  console.log("🔑 Checking API Key...");
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY is missing from .env");
    return;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    console.log("📡 Connecting to Google servers...");
    const modelResponse = await genAI.getGenerativeModel({ model: "gemini-pro" }).apiKey; 
    
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("\n✅ SUCCESS! Here are the models your key can access:\n");
    
    const availableModels = data.models || [];
    if (availableModels.length === 0) {
        console.log("⚠️  No models found. Your API Key might be valid, but has no model access.");
    } else {
        availableModels.forEach(m => {
            if (m.name.includes("gemini")) {
                console.log(`- ${m.name.replace("models/", "")}`);
            }
        });
    }

  } catch (error) {
    console.error("\n❌ FAILED TO LIST MODELS");
    console.error("Error details:", error.message);
  }
}

checkModels();