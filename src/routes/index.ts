import { Express } from "express";

import authRoutes from "@modules/auth/auth.routes";
import modelRoutes from "@modules/ai-model/model.routes";
import projectRoutes from "@modules/project/project.routes";
import conversationRoutes from "@modules/conversation/conversation.routes";
import messageRoutes from "@modules/message/message.routes";
import chatRoutes from "@modules/chat/chat.routes";
import accountRoutes from "@modules/account/account.routes";

export const registerRoutes = (app: Express) => {
  app.use("/api", authRoutes);

  app.use("/api/models", modelRoutes);

  app.use("/api/projects", projectRoutes);

  app.use("/api/conversations", conversationRoutes);

  app.use("/api/conversations", messageRoutes);

  app.use("/api/chat", chatRoutes);

  app.use("/api/account", accountRoutes);
};
