import "express-serve-static-core";
import { JwtPayload } from "./auth.types";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}
