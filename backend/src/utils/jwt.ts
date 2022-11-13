import {sign, SignOptions} from "jsonwebtoken"
import { load } from "ts-dotenv"
import { User } from "../entity/User"


export class JwtCreator {
    secret: string

    constructor() {
        const env = load({
            JWT_SECRET: String,
        })
        this.secret = env.JWT_SECRET
    }

    createToken(user: User): string {
        const payload = {
            name: user.username,
            userId: user.id,
            accessTypes: [ // mapping from Role to accesTypes needed!
                "getUserData",
                "editUserData",
                "getTodos"
            ]
          }
        const signInOptions: SignOptions = {
            algorithm: 'HS256',
            expiresIn: '1h'
        }
        return sign(payload, this.secret, signInOptions)
    }
}
