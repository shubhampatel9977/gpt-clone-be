import { Router } from "express";

import {
  createConversationController,
  getConversationsController,
  getConversationController,
  deleteConversationController,
  getProjectConversationsController,
} from "./conversation.controller";

import { authorize } from "@middlewares/auth.middleware";

const router = Router();

router.use(authorize());

router.post("/", createConversationController);

router.get("/", getConversationsController);

router.get("/:id", getConversationController);

router.delete("/:id", deleteConversationController);

router.get("/project/:projectId", getProjectConversationsController);

export default router;
