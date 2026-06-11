import { Response } from "express";

export const apiSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  return res.status(statusCode).json({
    statusCode,
    success: true,
    message,
    data,
  });
};

export const apiError = (
  res: Response,
  statusCode: number,
  message: string,
  data?: unknown
) => {
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    data,
  });
};
