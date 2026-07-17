import { Request, Response, NextFunction } from "express";

export const streamingResponse = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Disable compression for streaming responses
  res.setHeader("Content-Encoding", "identity");

  // Prevent proxy buffering (e.g. Nginx)
  res.setHeader("X-Accel-Buffering", "no");

  // Prevent caching
  res.setHeader("Cache-Control", "no-cache");

  next();
};
