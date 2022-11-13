import { Request, Response } from "express"
import { User } from "../entity/User";


export class TodoController {
    static async getTodos(req: Request, resp: Response) {
        resp.status(200).send([
            {"name": "learn Vue", "until": "01.05.2023", "done": false},
            {"name": "learn TS", "until": "01.04.2023", "done": false},
            {"name": "earn CKA", "until": "01.04.2022", "done": true}
        ])
    }

    static async getTodosForUser(user: User) {

    }
}
