import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import { UserRepository } from "../repositories/UserRepo";

export function checkRole(roles: Array<string>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    const userRepository = new UserRepository();
    let user: User;
    try {
      user = await userRepository.getUserById(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
}
