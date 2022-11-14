import { Request, Response } from "express";
import { User } from "../entity/User";
import { TodoRepository } from "../repositories/TodoRepo";

export class TodoController {
  static async getMockTodos(req: Request, resp: Response) {
    resp.status(200).send([
      { name: "learn Vue", until: "01.05.2023", done: false },
      { name: "learn TS", until: "01.04.2023", done: false },
      { name: "earn CKA", until: "01.04.2022", done: true },
    ]);
  }

  static async getTodosForUser(req: Request, resp: Response) {
    // WIP! get user from JWT
    const user: User = new User("admin", "admin@admin.de", "admin", "ADMIN");
    user.id = 1;
    const todoRepo: TodoRepository = new TodoRepository();
    const todos = todoRepo.getTodosForUser(user);
    resp.status(200).json(todos);
  }
}
