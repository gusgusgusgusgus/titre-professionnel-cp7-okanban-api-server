import { Router } from "express";

import { controllerWrapper as cw } from "../controllers/controllerWrapper.js";
import * as labelController from "../controllers/labelController.js";

export const router = new Router();

router.get("/labels", cw(labelController.getAllLabels));
router.get("/labels/:id", cw(labelController.getOneLabel));

router.post("/labels", cw(labelController.createLabel));
router.patch("/labels/:id", cw(labelController.updateLabel));
router.delete("/labels/:id", cw(labelController.deleteLabel));

router.put(
	"/tasks/:taskId/labels/:labelId",
	cw(labelController.addLabelToTask),
);
router.delete(
	"/tasks/:taskId/labels/:labelId",
	cw(labelController.removeLabelFromTask),
);
