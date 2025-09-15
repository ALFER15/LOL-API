import { env } from '../config/env.js';

export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const body = { error: err.message || 'Internal Server Error' };
  if (env.nodeEnv !== 'production' && err.stack) {
    body.stack = err.stack;
  }
  res.status(status).json(body);
}
