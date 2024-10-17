import { Router } from 'express';
import { createTodo, getTodosByDate } from '../controllers/todoController';

const router = Router();

router.post('/todos', createTodo);
router.get('/todos/:date', getTodosByDate);

export default router;
