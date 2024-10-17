import 'reflect-metadata'; // Essential for TypeORM decorators
import express from 'express';
import { AppDataSource } from './dataSource';
import userRoutes from './routes/userRoutes';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = 5500;

AppDataSource.initialize().then(async () => {
  app.use(express.json());

  app.use('/', userRoutes);
  app.use('/', todoRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.log(error));