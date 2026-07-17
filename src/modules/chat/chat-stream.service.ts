import { Request, Response } from "express";

import { prisma } from "@config/prisma";
import { openrouter } from "@config/openrouter";
import { AIMessage, ChatRole } from "@app-types/common.types";
import { OPENROUTER_VALUES } from "@utils/commonConstants";
import { generateConversationTitle } from "@utils/title-generator";
import { SendMessageInput } from "./chat.types";

export const sendMessageStream = async (
    userId: string,
    payload: SendMessageInput,
    req: Request,
    res: Response
  ) => {

    try {

      // SSE Headers
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");

      res.flushHeaders();

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
        throw new Error("Conversation not found");
      }

      // 2. Save USER Message
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: "USER",
          content: payload.message,
        },
      });

      // 3. Load Previous Messages
      const history = await prisma.message.findMany({
        where: { conversationId: conversation.id },
        orderBy: { createdAt: "asc" },
        take: OPENROUTER_VALUES.PREVIOUS_MESSAGE,
      });

      // 4. Convert For OpenRouter
      const messages: AIMessage[] = history.map((message) => ({
        role: message.role.toLowerCase() as ChatRole,
        content: message.content,
      }));

      // 5. OpenRouter Stream
      const stream = await openrouter.chat.completions.create({
        model: conversation.model.value,
        messages,
        max_tokens: OPENROUTER_VALUES.MAX_TOKEN,
        stream: true,
        stream_options: { include_usage: true },
      });

      let fullResponse = "";

      let promptTokens = 0;
      let completionTokens = 0;
      let totalTokens = 0;

      // 6. Stream Chunks
      for await ( const chunk of stream) {
  
        const content = chunk.choices[0]?.delta?.content ?? "";
      
        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({content,})}\n\n`);
        }

        if (chunk.usage) {
          promptTokens = chunk.usage.prompt_tokens ?? 0;
          completionTokens = chunk.usage.completion_tokens ?? 0;
          totalTokens = chunk.usage.total_tokens ?? 0;
        }
      }

      // 7. Save ASSISTANT Message
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: "ASSISTANT",
          content: fullResponse,
          promptTokens,
          completionTokens,
          totalTokens,
        },
      });

      // 8. Generate Title Once
      if (conversation.title === OPENROUTER_VALUES.CONVERSATION_DEFAULT_TITLE) {

        const title = await generateConversationTitle(payload.message);

        await prisma.conversation.update({
          where: { id: conversation.id },
          data: { title },
        });
      }

      // 9. Stream Complete
      res.write(`data: ${JSON.stringify({done: true})}\n\n`);
      res.end();

    } catch (error) {

      res.write(
        `data: ${JSON.stringify({
          error: true,

          message:
            error instanceof Error
              ? error.message
              : "Streaming failed",
        })}\n\n`
      );

      res.end();
    }
  };
  