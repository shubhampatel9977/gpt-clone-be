import { Request, Response } from "express";

import {
  getConversationMessages,
} from "./message.service";

import {
  apiSuccess,
  apiError,
} from "@utils/apiResponse";

import { getAuthUser } from "@utils/auth";

type MessageParams = {
  id: string;
};

export const getMessagesController =
  async (
    req: Request<MessageParams>,
    res: Response
  ) => {
    try {
      const authUser =
        getAuthUser(req);

      const messages =
        await getConversationMessages(
          req.params.id,
          authUser.userId
        );

      return apiSuccess(
        res,
        200,
        "Messages fetched successfully",
        messages
      );
    } catch (error) {
      return apiError(
        res,
        404,
        error instanceof Error
          ? error.message
          : "Messages not found"
      );
    }
  };
  