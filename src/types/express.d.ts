import "express-serve-static-core";
import { JwtPayload } from "@app-types/common.types";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}
