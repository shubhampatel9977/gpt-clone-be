import { Router } from "express";

import { authorize } from "@middlewares/auth.middleware";
import {
  register,
  login,
  logout,
  refreshToken,
  userInfo
} from "./auth.controller";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.get("/me", authorize(), userInfo);

export default router;
