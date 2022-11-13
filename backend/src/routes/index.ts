import { Router } from "express"
import auth from "./auth"
import todo from "./todo"

const routes = Router()

routes.use("/api/auth", auth)
routes.use("/api", todo)

export default routes
