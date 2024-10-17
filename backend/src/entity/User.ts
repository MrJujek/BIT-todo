import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Todo } from './Todo';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Todo, todo => todo.user, { cascade: true })
  todos!: Todo[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await Bun.password.hash(this.password);
  }
}
