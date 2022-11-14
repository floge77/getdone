import { Request, Response } from "express";

import { User } from "../entity/User";
import { UserRepository } from "../repositories/UserRepo";
import { createToken } from "../utils/jwt";

export class AuthController {
  static async login(req: Request, res: Response) {
    let { username, password } = req.body;
    if (!(password && username)) {
      res.status(400).send();
      return;
    }
    const userRepo: UserRepository = new UserRepository();
    let user: User;
    user = await userRepo.findUserByUsername(username);
    if (!user) {
      res.status(401).send();
      return;
    }
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }
    const token: string = createToken(user.id, user.username);
    res.status(200).json({ token: token });
  }

  static async register(req: Request, res: Response) {
    const userRepo: UserRepository = new UserRepository();
    let { username, email, password } = req.body;
    if (!(username && password && email)) {
      res.status(400).send();
      return;
    }
    let user: User = new User(
      username,
      email,
      password,
      "USER" // to make it easy
    );
    user.hashPassword();
    try {
      await userRepo.saveUser(user);
    } catch (e) {
      res.status(500).json({ message: "internal server error" });
      return;
    }
    console.log(`created user: ${username}, ${email}`);
    res.status(201).json({ message: "created" });
  }
}
