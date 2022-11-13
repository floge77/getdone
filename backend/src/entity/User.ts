import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Unique } from "typeorm"
import * as bcrypt from "bcrypt"

@Entity()
@Unique(["username"])
export class User {
    constructor(username: string, email: string, password: string, role: string) {
        this.username = username
        this.email = email
        this.password = password
        this.role = role
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: string

    hashPassword() {
        this.password =  bcrypt.hashSync(this.password, 8)
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string):boolean {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
