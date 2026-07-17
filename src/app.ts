import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";


import { configureCors } from "@config/cors";
import { registerRoutes } from "./routes";
import { COMPRESSION_EXCLUDED_ROUTES } from "./utils/commonConstants";

const app = express();

// Security Headers 
app.use(helmet());

// Compress Responses
app.use(
  compression({
    filter: (req, res) => {
      if (COMPRESSION_EXCLUDED_ROUTES.has(req.originalUrl.split("?")[0])) {
        return false;
      }

      return compression.filter(req, res);
    },
  })
);

// HTTP Request Logger (Development Only)
if (process.env.APP_ENV !== "production") {
  app.use(morgan("dev"));
}

// Parse JSON Body
app.use(express.json());

// Use cookie-parser to parse cookies
app.use(cookieParser());

// Apply CORS middleware
app.use(configureCors());

// Health Check
app.get("/", (_, res) => {
  res.status(200).send("Server is running...");
});

// Application Routes
registerRoutes(app);

export default app;
