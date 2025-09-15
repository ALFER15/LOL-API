import crypto from 'node:crypto';
import { validationResult } from 'express-validator';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../services/password.service.js';
import { signAccessToken, signRefreshToken, verifyRefresh } from '../services/token.service.js';

function hasValidationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: 'ValidationError', details: errors.array() });
    return true;
  }
  return false;
}

export async function register(req, res, next) {
  try {
    if (hasValidationErrors(req, res)) return;
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already in use' });

    const user = await User.create({ email, passwordHash: await hashPassword(password) });
    const payload = { sub: user._id.toString(), email: user.email, role: user.role };
    res.status(201).json({
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload)
    });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    if (hasValidationErrors(req, res)) return;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await comparePassword(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const payload = { sub: user._id.toString(), email: user.email, role: user.role };
    res.json({
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload)
    });
  } catch (e) { next(e); }
}

export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) return res.status(400).json({ error: 'refreshToken required' });
    const decoded = verifyRefresh(refreshToken);
    const payload = { sub: decoded.sub, email: decoded.email, role: decoded.role };
    res.json({ accessToken: signAccessToken(payload) });
  } catch (e) { next(e); }
}

export async function me(req, res) {
  res.json({ user: { id: req.user.sub, email: req.user.email, role: req.user.role } });
}

export async function requestPasswordReset(req, res, next) {
  try {
    if (hasValidationErrors(req, res)) return;
    const { email } = req.body;
    const user = await User.findOne({ email });
    // No revelar si no existe
    if (!user) return res.json({ ok: true });

    const token = crypto.randomBytes(24).toString('hex');
    const exp = new Date(Date.now() + env.resetTokenTtlMin * 60 * 1000);
    user.resetToken = token; user.resetTokenExp = exp; await user.save();
    res.json({ ok: true, resetToken: token, expiresAt: exp.toISOString() }); // en prod se enviaría por email
  } catch (e) { next(e); }
}

export async function resetPassword(req, res, next) {
  try {
    if (hasValidationErrors(req, res)) return;
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetToken: token, resetTokenExp: { $gt: new Date() } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    user.passwordHash = await hashPassword(newPassword);
    user.resetToken = undefined; user.resetTokenExp = undefined;
    await user.save();
    res.json({ ok: true });
  } catch (e) { next(e); }
}
