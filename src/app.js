import cors from 'cors';
import express, { json } from 'express';
import { setupRoutes } from './routes.js';
export const app = express();

app.use(json());
app.use(cors({ origin: '*', credentials: true }));

setupRoutes(app);
