import { Request, Response } from "express";

import { AuthenticatedRequest } from "@app-types/request.types";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "./project.service";

import {
  createProjectSchema,
  updateProjectSchema,
} from "./project.validation";

import {
  apiSuccess,
  apiError,
} from "@utils/apiResponse";

import { getAuthUser } from "@utils/auth";

type ProjectParams = {
  id: string;
};

export const createProjectController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const payload =
        createProjectSchema.parse(
          req.body
        );

      const authUser = getAuthUser(req);

      const project =
        await createProject(
          authUser.userId,
          payload
        );

      return apiSuccess(
        res,
        201,
        "Project created successfully",
        project
      );
    } catch (error) {
      return apiError(
        res,
        400,
        error instanceof Error
          ? error.message
          : "Failed to create project"
      );
    }
  };

export const getProjectsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const authUser = getAuthUser(req);

      const projects =
        await getProjects(
          authUser.userId
        );

      return apiSuccess(
        res,
        200,
        "Projects fetched successfully",
        projects
      );
    } catch {
      return apiError(
        res,
        500,
        "Failed to fetch projects"
      );
    }
  };

export const getProjectController =
  async (
    req: Request<ProjectParams>,
    res: Response
  ) => {
    try {
      const authUser = getAuthUser(req);

      const project =
        await getProjectById(
          req.params.id,
          authUser.userId
        );

      return apiSuccess(
        res,
        200,
        "Project fetched successfully",
        project
      );
    } catch (error) {
      return apiError(
        res,
        404,
        error instanceof Error
          ? error.message
          : "Project not found"
      );
    }
  };

export const updateProjectController =
  async (
    req: Request<ProjectParams>,
    res: Response
  ) => {
    try {
      const payload =
        updateProjectSchema.parse(
          req.body
        );

      const authUser = getAuthUser(req);

      const project =
        await updateProject(
          req.params.id,
          authUser.userId,
          payload
        );

      return apiSuccess(
        res,
        200,
        "Project updated successfully",
        project
      );
    } catch (error) {
      return apiError(
        res,
        400,
        error instanceof Error
          ? error.message
          : "Failed to update project"
      );
    }
  };

export const deleteProjectController =
  async (
    req: Request<ProjectParams>,
    res: Response
  ) => {
    try {
      const authUser = getAuthUser(req);

      await deleteProject(
        req.params.id,
        authUser.userId
      );

      return apiSuccess(
        res,
        200,
        "Project deleted successfully"
      );
    } catch (error) {
      return apiError(
        res,
        400,
        error instanceof Error
          ? error.message
          : "Failed to delete project"
      );
    }
  };
