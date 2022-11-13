import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"


export class UserRepository {
    userRepo: Repository<User> = AppDataSource.getRepository(User)

    async saveUser(u: User):Promise<User> {
        return await this.userRepo.save(u)
    }
    
    async getAllUsers():Promise<User[]> {
        return await this.userRepo.find()
    }
    
    async findUserByUsername(username: string):Promise<User|null> {
        return await this.userRepo.findOneBy({
            username: username,
        })
    }    
}
