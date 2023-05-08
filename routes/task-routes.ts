import express from "express";

const router = express.Router();

import { taskController } from "../controller/task-controller";

router.get("/", taskController.index.bind(taskController));

router.post("/create/*", taskController.create.bind(taskController));
router.get("/edit/*", taskController.edit.bind(taskController));
router.get("/delete/*", taskController.delete.bind(taskController));


export const taskRoutes = router;
