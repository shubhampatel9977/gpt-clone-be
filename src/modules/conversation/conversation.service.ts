import { prisma } from "@config/prisma";

import {
  CreateConversationInput,
} from "./conversation.types";
import { OPENROUTER_VALUES } from "@utils/commonConstants";

export const createConversation = async (
  userId: string,
  payload: CreateConversationInput
) => {
  const model =
    await prisma.aIModel.findFirst({
      where: {
        id: payload.modelId,
        isActive: true,
      },
    });

  if (!model) {
    throw new Error(
      "Model not found"
    );
  }

  if (payload.projectId) {
    const project =
      await prisma.project.findFirst({
        where: {
          id: payload.projectId,
          userId,
        },
      });

    if (!project) {
      throw new Error(
        "Project not found"
      );
    }
  }

  return prisma.conversation.create({
    data: {
      title: OPENROUTER_VALUES.CONVERSATION_DEFAULT_TITLE,
      userId,
      projectId: payload.projectId,
      modelId: payload.modelId,
      isTemporary: payload.isTemporary ?? false,
    },

    include: {
      model: true,
    },
  });
};

export const getStandaloneConversations = async (userId: string) => {
    return prisma.conversation.findMany({
      where: {
        userId,
        projectId: null,
        isTemporary: false,
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

      orderBy: {
        updatedAt: "desc",
      },
    });
};

export const getProjectConversations = async (
    userId: string,
    projectId: string
  ) => {
    return prisma.conversation.findMany({
      where: {
        userId,
        projectId,
        isTemporary: false,
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

      orderBy: {
        updatedAt: "desc",
      },
    });
};

export const getConversationById = async (
    id: string,
    userId: string
  ) => {
    const conversation =
      await prisma.conversation.findFirst({
        where: {
          id,
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

    return conversation;
};

export const deleteConversation = async (
    id: string,
    userId: string
  ) => {
    const conversation =
      await prisma.conversation.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!conversation) {
      throw new Error(
        "Conversation not found"
      );
    }

    return prisma.conversation.delete({
      where: {
        id,
      },
    });
};
