import { Request, Response, NextFunction } from "express";
import { sign, SignOptions, verify } from "jsonwebtoken";
import { load } from "ts-dotenv";

const env = load({
  JWT_SECRET: String,
});
const jwtSecret = env.JWT_SECRET;

export function createToken(userId: number, username: string): string {
  const payload = {
    name: username,
    userId: userId,
    accessTypes: [
      // mapping from Role to accesTypes needed!
      "getUserData",
      "editUserData",
      "getTodos",
    ],
  };
  const signInOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return sign(payload, jwtSecret, signInOptions);
}

export function checkJwt(req: Request, res: Response, next: NextFunction) {
  //Get the jwt token from the head
  const token = <string>req.headers["auth"];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>verify(token, jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  const { userId, username } = jwtPayload;
  const newToken = createToken(userId, username);
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
}

// export class JwtCreator {
//   secret: string;

//   constructor() {
//     const env = load({
//       JWT_SECRET: String,
//     });
//     this.secret = env.JWT_SECRET;
//   }

//   createToken(userId: number, username: string): string {
//     const payload = {
//       name: username,
//       userId: userId,
//       accessTypes: [
//         // mapping from Role to accesTypes needed!
//         "getUserData",
//         "editUserData",
//         "getTodos",
//       ],
//     };
//     const signInOptions: SignOptions = {
//       algorithm: "HS256",
//       expiresIn: "1h",
//     };
//     return sign(payload, this.secret, signInOptions);
//   }

//   checkJwt = (req: Request, res: Response, next: NextFunction) => {
//     //Get the jwt token from the head
//     const token = <string>req.headers["auth"];
//     let jwtPayload;

//     //Try to validate the token and get data
//     try {
//       jwtPayload = <any>verify(token, this.secret);
//       res.locals.jwtPayload = jwtPayload;
//     } catch (error) {
//       //If token is not valid, respond with 401 (unauthorized)
//       res.status(401).send();
//       return;
//     }

//     const { userId, username } = jwtPayload;
//     const newToken = this.createToken(userId, username);
//     res.setHeader("token", newToken);

//     //Call the next middleware or controller
//     next();
//   };
// }
