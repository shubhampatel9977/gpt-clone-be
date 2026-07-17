import { Router } from "express";

import { authorize } from "@middlewares/auth.middleware";
import { sendMessageController } from "./chat.controller";
import { sendMessageStreamController } from "./chat-stream.controller";

const router = Router();

router.use(authorize());

router.post("/send", sendMessageController);

router.post("/stream",  sendMessageStreamController);

export default router;
