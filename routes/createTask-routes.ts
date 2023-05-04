import express from "express";

const router = express.Router();
import { createTaskController } from "../controller/createTask-controller";

router.post("/", createTaskController.create.bind(createTaskController));

export const createTaskRoutes = router;
