import { Router } from 'express';
import {
  createUser,
  getUserAuth,
  login,
  logout,
} from '../controllers/auth.controller.js';

import { isAuth } from '../middlewares/auth.js';

const authRouter = Router();

authRouter.get('/', getUserAuth);
authRouter.post('/', createUser);
authRouter.post('/login', login);
authRouter.post('/logout', isAuth, logout);

export default authRouter;
