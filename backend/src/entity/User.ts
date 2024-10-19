import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Todo } from './Todo';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Todo, todo => todo.user, { cascade: true })
  todos!: Todo[];

  @BeforeInsert()
  hashPassword() {
    this.password = Bun.password.hashSync(this.password);
  }
}
