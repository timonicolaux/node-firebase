import animalsRouter from './routes/animals.routes.js';
import authRouter from './routes/auth.routes.js';

export function setupRoutes(app) {
  app.use('/animals', animalsRouter);
  app.use('/auth', authRouter);
}
