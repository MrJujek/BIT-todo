import { type Request, type Response } from 'express';
import { AppDataSource } from '../dataSource';
import { Todo } from '../entity/Todo';

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  console.log("createTodo");

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
  console.log("getTodosByDate");

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

export const patchTodo = async (req: Request, res: Response): Promise<void> => {
  console.log("patchTodo");

  try {
    const todoRepository = AppDataSource.getRepository(Todo);
    const { id } = req.params;
    const { checked } = req.body;

    const todo = await todoRepository.findOneBy({ id: Number(id) });
    if (todo) {
      todo.checked = checked;
      const result = await todoRepository.save(todo);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
