import { Router } from "express";

import { authorize } from "@middlewares/auth.middleware";

import { getAccountController } from "./account.controller";

const router = Router();

router.use(authorize());

router.get("/", getAccountController);

export default router;
