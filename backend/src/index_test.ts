import { AppDataSource } from "./data-source";

import { Todo } from "./entity/Todo";

import { Repository } from "typeorm";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    const user = new User("admin", "admin@admin.de", "admin", "ADMIN");
    user.id = 1;
    const todoRepo: Repository<Todo> = AppDataSource.getRepository(Todo);
    const todos = await todoRepo
      .createQueryBuilder("todo")
      .leftJoinAndSelect("todo.author", "user")
      .where("todo.authorId = :id", { id: user.id })
      .getMany();
    console.log(todos);
  })
  .catch((error) => console.log(error));
