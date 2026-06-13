import { prisma } from "@config/prisma";
import { openrouter } from "@config/openrouter";

import {
  AIMessage,
  ChatRole,
} from "@app-types/common.types";

import { SendMessageInput } from "./chat.types";

import {
  OPENROUTER_VALUES,
} from "@utils/commonConstants";

import {
  generateConversationTitle,
} from "@utils/title-generator";

export const sendMessage = async (
  userId: string,
  payload: SendMessageInput
) => {

  // 1. Validate Conversation
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

  // 2. Save USER Message
  await prisma.message.create({
    data: {
      conversationId:
        conversation.id,

      role: "USER",

      content:
        payload.message,
    },
  });

  // 3. Load Previous Messages
  const history =
    await prisma.message.findMany({
      where: {
        conversationId:
          conversation.id,
      },

      orderBy: {
        createdAt: "asc",
      },

      take:
        OPENROUTER_VALUES.PREVIOUS_MESSAGE,
    });

  // 4. Convert For OpenRouter
  const messages: AIMessage[] =
    history.map((message) => ({
      role:
        message.role.toLowerCase() as ChatRole,

      content:
        message.content,
    }));

  // 5. Call OpenRouter
  const completion =
    await openrouter.chat.completions.create({
      model:
        conversation.model.value,

      messages,

      max_tokens:
        OPENROUTER_VALUES.MAX_TOKEN,
    });

  // 6. Extract AI Response
  const aiResponse =
    completion.choices[0]
      ?.message?.content ?? "";

  // 7. Save ASSISTANT Message
  const assistantMessage =
    await prisma.message.create({
      data: {
        conversationId:
          conversation.id,

        role: "ASSISTANT",

        content:
          aiResponse,

        promptTokens:
          completion.usage
            ?.prompt_tokens ?? 0,

        completionTokens:
          completion.usage
            ?.completion_tokens ?? 0,

        totalTokens:
          completion.usage
            ?.total_tokens ?? 0,
      },
    });

  // 8. Generate Title (Only Once)
  if (conversation.title === OPENROUTER_VALUES.CONVERSATION_DEFAULT_TITLE) {
    const title =
      await generateConversationTitle(
        payload.message
      );

    await prisma.conversation.update({
      where: {
        id: conversation.id,
      },

      data: {
        title,
      },
    });
  }

  // 9. Return Response
  return {
    message:
      assistantMessage,
  };
};
