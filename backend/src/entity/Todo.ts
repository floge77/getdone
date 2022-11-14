import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {
  constructor(text: string, until: Date) {
    this.text = text;
    this.until = until;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  until: Date;

  @ManyToOne(() => User, (user) => user.todos)
  author: User;
}
