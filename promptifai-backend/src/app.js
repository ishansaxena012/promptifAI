import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import promptRoutes from "./routes/prompt.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/prompt", promptRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PromptifAI backend is healthy"
  });
});

app.use(errorHandler);

export default app;
