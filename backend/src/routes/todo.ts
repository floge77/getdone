import { Router } from "express";
import { TodoController } from "../controllers/TodoController";
import { checkRole } from "../middlewares/checkRole";
import { checkJwt } from "../utils/jwt";

const router = Router();

router.get("/todo", [checkJwt, checkRole(["USER", "ADMIN"])], TodoController.getTodosForUser)
router.post("/todo", [checkJwt, checkRole(["USER", "ADMIN"])], TodoController.addTodoForUser)
router.get("/mockTodo", TodoController.getMockTodos)

export default router;
