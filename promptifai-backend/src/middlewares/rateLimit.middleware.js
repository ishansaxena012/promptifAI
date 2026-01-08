import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,             // 30 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: "Too many requests. Please try again later."
    }
  }
});

export default rateLimiter;
