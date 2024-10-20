import { type Request, type Response } from "express";
import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import { validate, IsNotEmpty, IsEmail, Matches } from "class-validator";

export class CreateUserData {
  @IsNotEmpty({ message: "Username is required" })
  @Matches(/^[^@]+$/, { message: "Username cannot contain '@'" })
  username!: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({ allow_ip_domain: false }, { message: "Invalid email" })
  email!: string;

  @IsNotEmpty({ message: "Password is required" })
  password!: string;
}

class SigninUserData {
  @IsNotEmpty({ message: "Login is required" })
  login!: string;

  @Matches(/^.{6,}$/, {
    message: "Password must be at least 6 characters long",
  })
  @IsNotEmpty({ message: "Password is required" })
  password!: string;
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("createUser");

  try {
    const userRepository = AppDataSource.getRepository(User);
    const { username, email, password } = req.body;

    const existingUserByUsername = await userRepository.findOne({
      where: { username },
    });
    const existingUserByEmail = await userRepository.findOne({
      where: { email },
    });

    let data = new CreateUserData();
    data.username = username;
    data.email = email;
    data.password = password;

    const errors = await validate(data);

    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }

    if (existingUserByUsername) {
      res.status(400).json({ error: "Username taken" });
      return;
    }
    if (existingUserByEmail) {
      res.status(400).json({ error: "Email taken" });
      return;
    }

    const user = userRepository.create({ username, email, password });
    const result = await userRepository.save(user);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  console.log("getUsers");

  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const signinUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("loginUser");

  try {
    const userRepository = AppDataSource.getRepository(User);
    const { login, password } = req.body;

    let data = new SigninUserData();
    data.login = login;
    data.password = password;

    const errors = await validate(data);

    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }

    let user: User | null;

    if (typeof login == "string" && login.includes("@")) {
      user = await userRepository.findOne({ where: { email: login } });
    } else {
      user = await userRepository.findOne({ where: { username: login } });
    }

    const isMatch = Bun.password.verifySync(password, user?.password || "");

    if (user && isMatch) {
      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1d" });
      res.cookie("token", token, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const authUser = async (req: Request, res: Response): Promise<void> => {
  console.log("authUser");

  try {
    const token = req.headers.cookie?.split("=")[1];

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
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

      res.status(200).json(user);
    }
  } catch (error) {
    res.clearCookie("token");

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const signoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("signoutUser");

  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
