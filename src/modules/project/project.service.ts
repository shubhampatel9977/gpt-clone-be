import { prisma } from "@config/prisma";

import {
  CreateProjectInput,
  UpdateProjectInput,
} from "./project.types";

export const createProject = async (
  userId: string,
  payload: CreateProjectInput
) => {
  const existingProject =
    await prisma.project.findFirst({
      where: {
        userId,
        name: payload.name,
      },
    });

  if (existingProject) {
    throw new Error(
      "Project already exists"
    );
  }

  return prisma.project.create({
    data: {
      name: payload.name,
      userId,
    },
  });
};

export const getProjects = async (
  userId: string
) => {
  return prisma.project.findMany({
    where: {
      userId,
    },

    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getProjectById =
  async (
    id: string,
    userId: string
  ) => {
    const project =
      await prisma.project.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!project) {
      throw new Error(
        "Project not found"
      );
    }

    return project;
  };

export const updateProject =
  async (
    id: string,
    userId: string,
    payload: UpdateProjectInput
  ) => {
    const project =
      await prisma.project.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!project) {
      throw new Error(
        "Project not found"
      );
    }

    return prisma.project.update({
      where: {
        id,
      },

      data: payload,
    });
  };

export const deleteProject =
  async (
    id: string,
    userId: string
  ) => {
    const project =
      await prisma.project.findFirst({
        where: {
          id,
          userId,
        },
      });

    if (!project) {
      throw new Error(
        "Project not found"
      );
    }

    return prisma.project.delete({
      where: {
        id,
      },
    });
  };
