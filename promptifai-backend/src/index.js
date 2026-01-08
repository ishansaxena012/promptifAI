import dotenv from "dotenv";
dotenv.config(); 

import app from "./app.js";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`PromptifAI backend running on port ${PORT}`);
  console.log("API Key Status:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌");
});