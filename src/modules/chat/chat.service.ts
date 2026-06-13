import { prisma } from "@config/prisma";

import { SendMessageInput } from "./chat.types";

export const sendMessage = async (
  userId: string,
  payload: SendMessageInput
) => {
  const conversation =
    await prisma.conversation.findFirst({
      where: {
        id: payload.conversationId,
        userId,
      },

      include: {
        model: true,
      },
    });

  if (!conversation) {
    throw new Error(
      "Conversation not found"
    );
  }

  const userMessage =
    await prisma.message.create({
      data: {
        conversationId:
          conversation.id,

        role: "USER",

        content:
          payload.message,
      },
    });

  return {
    conversation,
    userMessage,
  };
};
