import { Router } from "express";
import {
  createTodo,
  getTodosByDate,
  patchTodo,
  deleteTodo,
} from "../controllers/todoController";

const router = Router();

router.post("/todos", createTodo);
router.get("/todos/:date", getTodosByDate);
router.patch("/todos/:id", patchTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
