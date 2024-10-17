import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, type Relation } from 'typeorm';
import { User } from './User.ts';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  task!: string;

  @ManyToOne(() => User, (user) => user.todos)
  user!: Relation<User>;
}
