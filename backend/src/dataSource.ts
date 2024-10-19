import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Todo } from './entity/Todo';
import * as dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: username,
  password: password,
  database: database,
  synchronize: true,
  entities: [User, Todo],
});