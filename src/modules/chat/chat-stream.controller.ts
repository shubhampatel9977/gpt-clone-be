import { Request, Response } from "express";

import { getAuthUser } from "@utils/auth";

import { sendMessageSchema } from "./chat.validation";

import { sendMessageStream } from "./chat-stream.service";

export const sendMessageStreamController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const payload =
        sendMessageSchema.parse(
          req.body
        );

      const authUser =
        getAuthUser(req);

      await sendMessageStream(
        authUser.userId,
        payload,
        req,
        res
      );
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Streaming failed",
      });
    }
  };
