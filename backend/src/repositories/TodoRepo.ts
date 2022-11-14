import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Todo } from "../entity/Todo";
import { User } from "../entity/User";

export class TodoRepository {
  todoRepo: Repository<Todo> = AppDataSource.getRepository(Todo);

  async saveTodo(t: Todo): Promise<Todo> {
    return this.todoRepo.save(t);
  }

  async getTodosForUser(user: User): Promise<Todo[]> {
    return this.todoRepo
      .createQueryBuilder("todo")
      .leftJoinAndSelect("todo.author", "user")
      .where("todo.authorId = :id", { id: user.id })
      .getMany();
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepo.find();
  }
}
