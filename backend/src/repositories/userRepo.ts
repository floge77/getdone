import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserRepository {
  userRepo: Repository<User> = AppDataSource.getRepository(User);

  async saveUser(u: User): Promise<User> {
    return this.userRepo.save(u);
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepo.findOneBy({
      id: id,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({
      username: username,
    });
  }
}
