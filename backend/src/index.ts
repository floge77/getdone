import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { load } from "ts-dotenv";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { UserRepository } from "./repositories/UserRepo";
import routes from "./routes";
import { Todo } from "./entity/Todo";
import { TodoRepository } from "./repositories/TodoRepo";

AppDataSource.initialize()
  .then(async () => {
    const env = load({
      PORT: Number,
    });

    console.log("Inserting a new user into the database...");
    const user = new User("admin", "admin@admin.de", "admin", "ADMIN");
    user.id = 1;
    user.hashPassword();

    const userRepo = new UserRepository();

    //await userRepo.saveUser(user)
    console.log("Saved a new user with id: " + user.id);
    console.log("Loading all users from the database...");
    const users = await userRepo.getAllUsers();
    console.log("Loaded users: ", users);

    console.log("Finding user by username");
    const foundUser = await userRepo.findUserByUsername("admin");
    console.log(foundUser);

    let todo: Todo = new Todo("learn TS", new Date("01-04-2023"));
    todo.author = user;
    let todoRepo: TodoRepository = new TodoRepository();
    //todoRepo.saveTodo(todo)
    const allTodos = await todoRepo.getAllTodos();
    console.log(`all todos: ${JSON.stringify(allTodos)}`);
    let todosForUser: Todo[] = await todoRepo.getTodosForUser(user);
    console.log(
      `all todos for user ${user.username}: ${JSON.stringify(todosForUser)}`
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.use("/", routes);
    const port = env.PORT;

    app.listen(port, () => {
      console.log(`Todo listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
