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
      });

    if (!conversation) {
      throw new Error(
        "Conversation not found"
      );
    }

    return prisma.message.findMany({
      where: {
        conversationId,
      },

      orderBy: {
        createdAt: "asc",
      },
    });
  };
  