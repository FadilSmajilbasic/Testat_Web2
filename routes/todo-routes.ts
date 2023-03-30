import express from 'express';

const router = express.Router();
import {todoController} from '../controller/todo-controller';

router.get("/", todoController.newTodo.bind(todoController));

export const todoRoutes = router;
