import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import { load } from "ts-dotenv"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { UserRepository } from "./repositories/userRepo"
import routes  from "./routes"


AppDataSource.initialize().then(async () => {
    const env = load({
        PORT: Number,
    })
    
    console.log("Inserting a new user into the database...")
    const user = new User(
        "jockel",
        "jockel@more.de",
        "mypassword",
        "ADMIN"
    )
    user.hashPassword()

    const userRepo = new UserRepository()

    //await userRepo.saveUser(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading all users from the database...")
    const users = await userRepo.getAllUsers()
    console.log("Loaded users: ", users)

    console.log("Finding user by username")
    const foundUser = await userRepo.findUserByUsername("jockel")
    console.log(foundUser)

    const app = express()
    app.use(bodyParser.json())
    app.use(cors())
    
    app.use("/", routes)
    const port = env.PORT

    app.listen(port, () => {
    console.log(`Todo listening at http://localhost:${port}`)
    })

}).catch(error => console.log(error))
