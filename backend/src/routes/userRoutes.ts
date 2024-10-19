import { Router } from 'express';
import { createUser, getUsers, signinUser, authUser } from '../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.post('/users/signin', signinUser);
router.post('/users/auth', authUser);

export default router;
