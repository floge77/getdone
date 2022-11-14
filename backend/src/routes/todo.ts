import { Router } from "express";
import { TodoController } from "../controllers/TodoController";

const router = Router();

router.get("/todo", TodoController.getTodosForUser);

export default router;
