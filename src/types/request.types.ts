import { Request } from "express";
import { JwtPayload } from "./auth.types";

export type AuthenticatedRequest =
  Request & {
    user: JwtPayload;
  };
  