import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';
import {
  register, login, refresh, me,
  requestPasswordReset, resetPassword
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/auth.js';

const r = Router();

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const sensitiveLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30 });

r.post('/register',
  authLimiter,
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  register
);

r.post('/login',
  authLimiter,
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  login
);

r.post('/refresh',
  authLimiter,
  body('refreshToken').isString().notEmpty(),
  refresh
);

r.get('/me', authRequired, me);

r.post('/password/forgot',
  sensitiveLimiter,
  body('email').isEmail(),
  requestPasswordReset
);

r.post('/password/reset',
  sensitiveLimiter,
  body('token').isString().notEmpty(),
  body('newPassword').isString().isLength({ min: 6 }),
  resetPassword
);

export default r;
