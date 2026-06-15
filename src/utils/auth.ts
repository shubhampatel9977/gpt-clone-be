import { Request } from "express";
import { JwtPayload } from "@app-types/common.types";

export const getAuthUser = (
  req: Request
): JwtPayload => {
  return (req as any).user;
};
