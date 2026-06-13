import { prisma } from "@config/prisma";

import {
  CreateModelInput,
  UpdateModelInput,
} from "./model.types";

export const createModel = async (
  payload: CreateModelInput
) => {
  const existingModel =
    await prisma.aIModel.findFirst({
      where: {
        OR: [
          {
            label: payload.label,
          },
          {
            value: payload.value,
          },
        ],
      },
    });

  if (existingModel) {
    throw new Error(
      "Model already exists"
    );
  }

  if (payload.isDefault) {
    await prisma.aIModel.updateMany({
      where: {
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });
  }

  const model =
    await prisma.aIModel.create({
      data: {
        label: payload.label,
        value: payload.value,
        provider: payload.provider,
        description:
          payload.description,
        isDefault:
          payload.isDefault ??
          false,
      },
    });

  return model;
};

export const getActiveModels =
  async () => {
    return prisma.aIModel.findMany({
      where: {
        isActive: true,
      },

      orderBy: {
        label: "asc",
      },

      select: {
        id: true,
        label: true,
        provider: true,
        isDefault: true,
      },
    });
  };

export const getAllModels =
  async () => {
    return prisma.aIModel.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  };

export const updateModel = async (
  id: string,
  payload: UpdateModelInput
) => {
  const model =
    await prisma.aIModel.findUnique({
      where: {
        id,
      },
    });

  if (!model) {
    throw new Error(
      "Model not found"
    );
  }

  if (payload.isDefault) {
    await prisma.aIModel.updateMany({
      where: {
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });
  }

  return prisma.aIModel.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteModel = async (
  id: string
) => {
  const model =
    await prisma.aIModel.findUnique({
      where: {
        id,
      },
    });

  if (!model) {
    throw new Error(
      "Model not found"
    );
  }

  return prisma.aIModel.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
};

export const getDefaultModel =
  async () => {
    return prisma.aIModel.findFirst({
      where: {
        isDefault: true,
        isActive: true,
      },
    });
  };
