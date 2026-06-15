import { Request } from "express";
import { JwtPayload } from "@app-types/common.types";

export type AuthenticatedRequest =
  Request & {
    user: JwtPayload;
  };
  