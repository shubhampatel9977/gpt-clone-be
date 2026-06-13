import { Request, Response } from "express";

type ModelParams = {
  id: string;
};

import {
  createModel,
  getActiveModels,
  getAllModels,
  updateModel,
  deleteModel,
} from "./model.service";

import {
  createModelSchema,
  updateModelSchema,
} from "./model.validation";

import {
  apiSuccess,
  apiError,
} from "@utils/apiResponse";

export const createModelController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const payload =
        createModelSchema.parse(
          req.body
        );

      const model =
        await createModel(payload);

      return apiSuccess(
        res,
        201,
        "Model created successfully",
        model
      );
    } catch (error) {
      return apiError(
        res,
        400,
        error instanceof Error
          ? error.message
          : "Failed to create model"
      );
    }
  };

export const getModelsController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const models =
        await getActiveModels();

      return apiSuccess(
        res,
        200,
        "Models fetched successfully",
        models
      );
    } catch {
      return apiError(
        res,
        500,
        "Failed to fetch models"
      );
    }
  };

export const getAllModelsController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const models =
        await getAllModels();

      return apiSuccess(
        res,
        200,
        "Models fetched successfully",
        models
      );
    } catch {
      return apiError(
        res,
        500,
        "Failed to fetch models"
      );
    }
  };

export const updateModelController = async (
    req: Request<ModelParams>,
    res: Response
  ) => {
    try {
      const payload =
        updateModelSchema.parse(
          req.body
        );

      const model =
        await updateModel(
          req.params.id,
          payload
        );

      return apiSuccess(
        res,
        200,
        "Model updated successfully",
        model
      );
    } catch (error) {
      return apiError(
        res,
        400,
        error instanceof Error
          ? error.message
          : "Failed to update model"
      );
    }
  };

export const deleteModelController = async (
    req: Request<ModelParams>,
    res: Response
  ) => {
    try {
      await deleteModel(
        req.params.id
      );

      return apiSuccess(
        res,
        200,
        "Model deleted successfully"
      );
    } catch (error) {
      return apiError(
        res,
        400,
        error instanceof Error
          ? error.message
          : "Failed to delete model"
      );
    }
  };
