import cors from 'cors';
import express, { json } from 'express';
import { setupRoutes } from './routes.js';
import { createRequire } from 'module';
import { db } from './firebase.js';
const require = createRequire(import.meta.url);
const session = require('express-session');
const FirestoreStore = require('firestore-store')(session);
export const app = express();

app.use(
  session({
    secret: 'secret',
    name: '__session',
    cookie: { maxAge: 10000 },
    saveUninitialized: false,
    resave: false,
    store: new FirestoreStore({ database: db }),
  })
);
app.use(json());
app.use(cors({ origin: '*', credentials: true }));

setupRoutes(app);
