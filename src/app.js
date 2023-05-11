import cors from 'cors';
import express, { json } from 'express';
import { setupRoutes } from './routes.js';
import { createRequire } from 'module';
import { db } from './firebase.js';
const require = createRequire(import.meta.url);
const session = require('express-session');
const FirestoreStore = require('firestore-store')(session);

export const app = express();

app.use(json());
app.use(
  cors({
    origin: [
      'http://127.0.0.1:5173',
      'https://127.0.0.1:5173',
      'https://127.0.0.1:5173/login',
      'http://127.0.0.1:5173/login',
    ],
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: [
      'Origin',
      'Content-Type',
      'Authorization',
      'x-csrf-token',
      'X-Requested-With',
    ],
    credentials: true,
    AccessControlAllowCredentials: true,
    AccessControlAllowOrigin: true,
  })
);

setupRoutes(app);
