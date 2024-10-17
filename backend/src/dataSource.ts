import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Todo } from './entity/Todo';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'zaq1@WSX',
  database: 'todos',
  synchronize: true,
  entities: [User, Todo],
});