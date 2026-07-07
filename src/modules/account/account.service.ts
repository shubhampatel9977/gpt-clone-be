import { prisma } from "@config/prisma";

import { AccountResponse } from "./account.types";

export const getAccountDetails = async (
  userId: string
): Promise<AccountResponse> => {

  // Profile
  const user = await prisma.user.findUnique({
    where: { id: userId },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      provider: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Projects
  const projectCount =
    await prisma.project.count({
      where: {userId},
    });

  // Conversations
  const chatCount =
    await prisma.conversation.count({
      where: {
        userId,
        isTemporary: false,
      },
    });

  // Message Stats
  const messageStats =
    await prisma.message.aggregate({
      where: {
        conversation: {
          userId,
        },
      },

      _count: {
        id: true,
      },

      _sum: {
        totalTokens: true,
      },
    });

  return {
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      provider: user.provider,
    },

    stats: {
      chatCount,

      projectCount,

      messageCount:
        messageStats._count.id,

      totalTokens:
        messageStats._sum.totalTokens ?? 0,
    },
  };
};
