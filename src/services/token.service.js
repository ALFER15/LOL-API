import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
export function signAccessToken(payload, ttl = env.jwt.accessTtl) { return jwt.sign(payload, env.jwt.secret, { expiresIn: ttl }); }
export function signRefreshToken(payload, ttl = env.jwt.refreshTtl) { return jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: ttl }); }
export function verifyAccess(token) { return jwt.verify(token, env.jwt.secret); }
export function verifyRefresh(token) { return jwt.verify(token, env.jwt.refreshSecret); }
