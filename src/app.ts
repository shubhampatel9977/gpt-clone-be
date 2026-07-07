import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

dotenv.config();

import { configureCors } from "@config/cors";
import authRoutes from "@modules/auth/auth.routes";
import modelRoutes from "@modules/ai-model/model.routes";
import projectRoutes from "@modules/project/project.routes";
import conversationRoutes from "@modules/conversation/conversation.routes";
import messageRoutes from "@modules/message/message.routes";
import chatRoutes from "@modules/chat/chat.routes";
import accountRoutes from "@modules/account/account.routes";

dotenv.config();

const app = express();

// Apply CORS middleware
app.use(configureCors());

// Use cookie-parser to parse cookies
app.use(cookieParser());

app.use(express.json());

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
