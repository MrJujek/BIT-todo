import { type Request, type Response } from "express";
import { AppDataSource } from "../dataSource";
import { Todo } from "../entity/Todo";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("createTodo");

  try {
    const token = req.headers.cookie?.split("=")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, "secret") as {
      id: number;
      iat: number;
      exp: number;
    };
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const todoRepository = AppDataSource.getRepository(Todo);

    const todo = todoRepository.create({ ...req.body, user: user });

    const result = await todoRepository.save(todo);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const getTodosByDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("getTodosByDate");

  try {
    const token = req.headers.cookie?.split("=")[1];
    console.log(token);

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, "secret") as {
      id: number;
      iat: number;
      exp: number;
    };
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const todoRepository = AppDataSource.getRepository(Todo);

    let todos;
    if (req.params.date === "all") {
      todos = await todoRepository.find({ where: { user: user } });
    } else {
      todos = await todoRepository.find({
        where: { date: req.params.date, user: user },
      });
    }

    res.status(200).json(todos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
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
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
