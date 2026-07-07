import { Request, Response } from "express";

import { getAuthUser } from "@utils/auth";

import {
  apiSuccess,
  apiError,
} from "@utils/apiResponse";

import { sendMessageSchema } from "./chat.validation";

import { sendMessage } from "./chat.service";

export const sendMessageController =
  async (
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

      const result =
        await sendMessage(
          authUser.userId,
          payload
        );

      return apiSuccess(
        res,
        200,
        "Message sent successfully",
        result
      );
    } catch (error) {
      return apiError(
        res,
        400,
        error instanceof Error
          ? error.message
          : "Failed to send message"
      );
    }
  };
