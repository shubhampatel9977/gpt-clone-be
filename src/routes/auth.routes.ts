import { Router } from "express";

import {
  register,
  login,
  logout,
  refreshToken,
  userInfo
} from "@controllers/auth.controller";
import { authorize } from "@middlewares/auth.middleware";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.get("/me", authorize(), userInfo);

export default router;