import { Router } from 'express';
import { createTodo, getTodosByDate, patchTodo } from '../controllers/todoController';

const router = Router();

router.post('/todos', createTodo);
router.get('/todos/:date', getTodosByDate);
router.patch('/todos/:id', patchTodo);

export default router;
