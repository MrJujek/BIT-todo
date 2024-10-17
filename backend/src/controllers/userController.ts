import { type Request, type Response } from 'express';
import { AppDataSource } from '../dataSource';
import { User } from '../entity/User';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { username, email, password } = req.body;
    const user = userRepository.create({ username, email, password });
    const result = await userRepository.save(user);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
