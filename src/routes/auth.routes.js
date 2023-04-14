import { Router } from 'express';
import {
  createUser,
  getUserAuth,
  login,
} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.get('/', getUserAuth);
authRouter.post('/', createUser);
authRouter.post('/login', login);

export default authRouter;
