import { Request, Response } from "express";

import {
  createConversation,
  getStandaloneConversations,
  getProjectConversations,
  getConversationById,
  deleteConversation,
} from "./conversation.service";

import {
  createConversationSchema,
} from "./conversation.validation";

import {
  apiSuccess,
  apiError,
} from "@utils/apiResponse";

import { getAuthUser } from "@utils/auth";

type ConversationParams = {
  id: string;
};

type ProjectConversationParams = {
  projectId: string;
};

export const createConversationController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const payload =
        createConversationSchema.parse(
          req.body
        );

      const authUser =
        getAuthUser(req);

      const conversation =
        await createConversation(
          authUser.userId,
          payload
        );

      return apiSuccess(
        res,
        201,
        "Conversation created successfully",
        conversation
      );
    } catch (error) {
      return apiError(
        res,
        400,
        error instanceof Error
          ? error.message
          : "Failed to create conversation"
      );
    }
  };

export const getConversationsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const authUser =
        getAuthUser(req);

      const conversations =
        await getStandaloneConversations(
          authUser.userId
        );

      return apiSuccess(
        res,
        200,
        "Conversations fetched successfully",
        conversations
      );
    } catch {
      return apiError(
        res,
        500,
        "Failed to fetch conversations"
      );
    }
  };

export const getProjectConversationsController =
  async (
    req: Request<ProjectConversationParams>,
    res: Response
  ) => {
    try {
      const authUser =
        getAuthUser(req);

      const conversations =
        await getProjectConversations(
          authUser.userId,
          req.params.projectId
        );

      return apiSuccess(
        res,
        200,
        "Project conversations fetched successfully",
        conversations
      );
    } catch {
      return apiError(
        res,
        500,
        "Failed to fetch conversations"
      );
    }
  };

export const getConversationController =
  async (
    req: Request<ConversationParams>,
    res: Response
  ) => {
    try {
      const authUser =
        getAuthUser(req);

      const conversation =
        await getConversationById(
          req.params.id,
          authUser.userId
        );

      return apiSuccess(
        res,
        200,
        "Conversation fetched successfully",
        conversation
      );
    } catch (error) {
      return apiError(
        res,
        404,
        error instanceof Error
          ? error.message
          : "Conversation not found"
      );
    }
  };

export const deleteConversationController =
  async (
    req: Request<ConversationParams>,
    res: Response
  ) => {
    try {
      const authUser =
        getAuthUser(req);

      await deleteConversation(
        req.params.id,
        authUser.userId
      );

      return apiSuccess(
        res,
        200,
        "Conversation deleted successfully"
      );
    } catch (error) {
      return apiError(
        res,
        400,
        error instanceof Error
          ? error.message
          : "Failed to delete conversation"
      );
    }
  };
