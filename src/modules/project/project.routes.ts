import { Router } from "express";

import {
  createProjectController,
  getProjectsController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
} from "./project.controller";

import { authorize } from "@middlewares/auth.middleware";

const router = Router();

router.use(authorize());

router.post("/", createProjectController);

router.get("/", getProjectsController);

router.get("/:id", getProjectController);

router.patch("/:id", updateProjectController);

router.delete("/:id", deleteProjectController);

export default router;
