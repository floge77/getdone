import { Router } from "express"
import { AuthController } from "../controllers/AuthController"
import { UserRepository } from "../repositories/userRepo"

const router = Router()

router.post("/login", AuthController.login)
router.post("/register", AuthController.register)

export default router
