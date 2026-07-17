import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";


import { configureCors } from "@config/cors";
import { registerRoutes } from "./routes";

const app = express();

// Security Headers 
app.use(helmet());

// Compress Responses
app.use(compression());

// HTTP Request Logger (Development Only)
if (process.env.APP_ENV !== "production") {
  app.use(morgan("dev"));
}

// Apply CORS middleware
app.use(configureCors());

// Parse JSON Body
app.use(express.json());

// Use cookie-parser to parse cookies
app.use(cookieParser());

app.get("/", (_, res) => {
  res.status(200).send("Server is running...");
});

// Add application routes
registerRoutes(app);

export default app;
