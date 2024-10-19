import { type Request, type Response } from 'express';
import { AppDataSource } from '../dataSource';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  console.log('createUser');

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
  console.log('getUsers');

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

export const signinUser = async (req: Request, res: Response): Promise<void> => {
  console.log('loginUser');

  try {
    const userRepository = AppDataSource.getRepository(User);
    const { login, password } = req.body;

    if (!login || !password) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      let user: User | null;

      if (typeof login == "string" && login.includes("@")) {
        user = await userRepository.findOne({ where: { email: login } });
      } else {
        user = await userRepository.findOne({ where: { username: login } });
      }

      const isMatch = Bun.password.verifySync(password, user?.password || '');

      console.log(user);

      if (user && isMatch) {
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        res.status(200).json(user);
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}

export const authUser = async (req: Request, res: Response): Promise<void> => {
  console.log('authUser');

  try {
    const token = req.headers.cookie?.split('=')[1];
    console.log(token);

    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      const decoded = jwt.verify(token, 'secret') as { id: number, iat: number, exp: number };
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: decoded.id } });
      res.status(200).json(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}