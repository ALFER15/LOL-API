import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { router } from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

export function createApp() {
  const app = express();

  // Seguridad ligera
  app.use(helmet());

  // CORS con lista blanca
  const corsOptions = {
    origin(origin, callback) {
      if (!origin) return callback(null, true); // permite Postman/Thunder/curl sin Origin
      if (env.corsOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS: origen no permitido'));
    },
    credentials: true
  };
  app.use(cors(corsOptions));

  // JSON parser
  app.use(express.json({ limit: '1mb' }));

  // Rutas
  app.use('/', router);

  // 404 y errores
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
