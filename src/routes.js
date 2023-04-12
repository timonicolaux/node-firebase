import animalsRouter from './routes/animals.routes.js';

export function setupRoutes(app) {
  app.use('/animals', animalsRouter);
}
