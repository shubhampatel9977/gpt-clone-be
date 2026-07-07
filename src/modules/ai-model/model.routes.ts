import { Router } from "express";

import {
  createModelController,
  getModelsController,
  getAllModelsController,
  updateModelController,
  deleteModelController,
} from "./model.controller";

const router = Router();

router.get("/", getModelsController);

router.get("/admin", getAllModelsController);

router.post("/", createModelController);

router.patch("/:id", updateModelController);

router.delete("/:id", deleteModelController);

export default router;
