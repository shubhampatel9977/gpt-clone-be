import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";


import { configureCors } from "@config/cors";

import authRoutes from "@modules/auth/auth.routes";
import modelRoutes from "@modules/ai-model/model.routes";
import projectRoutes from "@modules/project/project.routes";
import conversationRoutes from "@modules/conversation/conversation.routes";
import messageRoutes from "@modules/message/message.routes";
import chatRoutes from "@modules/chat/chat.routes";
import accountRoutes from "@modules/account/account.routes";

const app = express();

// Security Headers 
app.use(helmet());

// Compress Responses
app.use(compression());

// HTTP Request Logger (Development Only)
if (process.env.NODE_ENV !== "production") {
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

app.use("/api", authRoutes);

app.use("/api/models", modelRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/conversations", conversationRoutes);

app.use("/api/conversations", messageRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/account", accountRoutes);

export default app;
