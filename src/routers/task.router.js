import { Router } from "express";

import * as taskController from '../controllers/taskController.js';
import {controllerWrapper as cw} from "../controllers/controllerWrapper.js";

export const router = new Router();

router.get('/tasks', cw(taskController.getAllTasks));
router.get('/tasks/:id', cw(taskController.getOneTask));
router.get('/lists/:id/tasks', cw(taskController.getAllTasksOfList));

router.post('/tasks', cw(taskController.createTask));
router.patch('/tasks/:id', cw(taskController.updateTask));
router.delete("/tasks/:id", cw(taskController.deleteTask));