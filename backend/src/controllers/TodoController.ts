import { Request, Response } from "express";
import { Todo } from "../entity/Todo";
import { User } from "../entity/User";
import { TodoRepository } from "../repositories/TodoRepo";
import { UserRepository } from "../repositories/UserRepo";

export class TodoController {
  static async getMockTodos(req: Request, resp: Response) {
    resp.status(200).send([
      { name: "learn Vue", until: "01.05.2023", done: false },
      { name: "learn TS", until: "01.04.2023", done: false },
      { name: "earn CKA", until: "01.04.2022", done: true },
    ]);
  }

  static async getTodosForUser(req: Request, resp: Response) {
    const id = resp.locals.jwtPayload.userId;
    const userRepo: UserRepository = new UserRepository();
    const user: User = await userRepo.getUserById(id);
    const todoRepo: TodoRepository = new TodoRepository();
    const todos = await todoRepo.getTodosForUser(user);
    let todoResult: Todo[] = [];
    todos.map(function (t) {
      let todo = new Todo(t.text, t.until);
      todo.id = t.id;
      todoResult.push(todo);
    });
    resp.status(200).json(todoResult);
  }

  static async addTodoForUser(req: Request, resp: Response) {
    let { text, until } = req.body;
    if (!(text && until)) {
      resp.status(400).send();
      return;
    }
    let date: Date
    try {
        date = new Date(until)
    } catch(e) {
        console.log(`could not parse date: ${e}`)
    }
    let todo: Todo = new Todo(text, date)
    const id = resp.locals.jwtPayload.userId;
    const userRepo: UserRepository = new UserRepository();
    const user: User = await userRepo.getUserById(id);
    todo.author = user
    const todoRepo: TodoRepository = new TodoRepository();
    await todoRepo.saveTodo(todo)
    resp.status(201).json({"todo": todo})
  }
}
