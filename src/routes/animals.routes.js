import { Router } from 'express';
import {
  getAllAnimals,
  getOneAnimal,
  createOneAnimal,
  modifyOneAnimal,
  deleteOneAnimal,
} from '../controllers/animals.controller.js';

const animalsRouter = Router();

animalsRouter.get('/', getAllAnimals);
animalsRouter.get('/:id', getOneAnimal);
animalsRouter.post('/addOneAnimal', createOneAnimal);
animalsRouter.patch('/modifyOneAnimal/:id', modifyOneAnimal);
animalsRouter.delete('/deleteOneAnimal/:id', deleteOneAnimal);

export default animalsRouter;
