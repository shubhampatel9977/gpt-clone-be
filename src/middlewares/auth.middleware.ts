import { NextFunction, Request, Response } from "express";

import { apiError } from "@utils/apiResponse";
import { verifyAccessToken } from "@utils/jwt";

export const authorize =
  (roles: string[] = []) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.cookies?.accessToken;

      if (!token) {
        return apiError(
          res,
          401,
          "Unauthorized - Missing token"
        );
      }

      const decoded = verifyAccessToken(token);

      if (
        roles.length &&
        !roles.includes(decoded.role)
      ) {
        return apiError(
          res,
          403,
          "Permission denied"
        );
      }

      req.user = decoded;

      next();
    } catch {
      return apiError(
        res,
        401,
        "Unauthorized"
      );
    }
  };
