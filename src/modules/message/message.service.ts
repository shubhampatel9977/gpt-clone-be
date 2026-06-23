import { prisma } from "@config/prisma";

export const getConversationMessages =
  async (
    conversationId: string,
    userId: string
  ) => {

    const conversation =
      await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },

        include: {
          model: {
            select: {
              id: true,
              label: true,
              provider: true,
            },
          },
        },
      });

    if (!conversation) {
      throw new Error(
        "Conversation not found"
      );
    }

    const messages =
      await prisma.message.findMany({
        where: {
          conversationId,
        },

        orderBy: {
          createdAt: "asc",
        },
      });

    return {
      conversation,
      messages,
    };
  };
  