import { Router } from "express";

import { authorize } from "@middlewares/auth.middleware";
import { streamingResponse } from "@middlewares/streamingResponse.middleware";
import { sendMessageController } from "./chat.controller";
import { sendMessageStreamController } from "./chat-stream.controller";

const router = Router();

router.use(authorize());

router.post("/send", sendMessageController);

router.post("/stream", streamingResponse,  sendMessageStreamController);

export default router;
