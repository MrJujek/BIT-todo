import { type Request, type Response } from 'express';
import { AppDataSource } from '../dataSource';
import { Todo } from '../entity/Todo';

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = todoRepository.create(req.body);
    const result = await todoRepository.save(todo);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getTodosByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoRepository = AppDataSource.getRepository(Todo);
    const todos = await todoRepository.find({ where: { date: req.params.date }, relations: ['user'] });
    res.status(200).json(todos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
