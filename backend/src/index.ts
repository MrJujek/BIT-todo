import 'reflect-metadata'; // Essential for TypeORM decorators
import express from 'express';
import { createUser, getUsers } from './controllers/userController.ts';
import { AppDataSource } from './dataSource';
import { createTodo, getTodosByDate } from './controllers/todoController.ts';

const app = express();
const PORT = 5500;

AppDataSource.initialize().then(async () => {
  app.use(express.json());

  app.post('/users', createUser);
  app.get('/users', getUsers);

  app.post('/todos', createTodo)
  app.get('/todos/:date', getTodosByDate)

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.log(error));