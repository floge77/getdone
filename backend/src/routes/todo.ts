import { Router } from "express"
import { TodoController } from "../controllers/TodoController"

const router = Router()

router.get("/todo", TodoController.getTodos)

export default router
