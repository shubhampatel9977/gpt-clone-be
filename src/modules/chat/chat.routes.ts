import { Router } from "express";

import { authorize } from "@middlewares/auth.middleware";

import { sendMessageController } from "./chat.controller";

const router = Router();

router.use(authorize());

router.post("/send", sendMessageController);

export default router;
