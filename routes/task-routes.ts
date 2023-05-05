import express from 'express';

const router = express.Router();

import { taskController } from "../controller/task-controller";


router.get("/", taskController.index.bind(taskController));

router.post("/create", taskController.create.bind(taskController));
export const taskRoutes = router;
