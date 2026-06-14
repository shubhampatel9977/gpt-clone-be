import { Router } from "express";

import { authorize } from "@middlewares/auth.middleware";

import {
  getMessagesController,
} from "./message.controller";

const router = Router();

router.use(authorize());

router.get("/:id/messages", getMessagesController);

export default router;
