import { Router } from 'express';
import {
  getAllAnimals,
  getOneAnimal,
  createOneAnimal,
  modifyOneAnimal,
  deleteOneAnimal,
} from '../controllers/animals.controller.js';

import { isAuth } from '../middlewares/auth.js';

const animalsRouter = Router();

animalsRouter.get('/', isAuth, getAllAnimals);
animalsRouter.get('/:id', getOneAnimal);
animalsRouter.post('/addOneAnimal', isAuth, createOneAnimal);
animalsRouter.patch('/modifyOneAnimal/:id', isAuth, modifyOneAnimal);
animalsRouter.delete('/deleteOneAnimal/:id', isAuth, deleteOneAnimal);

export default animalsRouter;
