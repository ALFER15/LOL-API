import { verifyAccess } from '../services/token.service.js';

function parseBearer(req) {
  const h = req.headers.authorization || '';
  const [type, token] = h.split(' ');
  return (type === 'Bearer' && token) ? token : null;
}

export function authRequired(req, res, next) {
  try {
    const token = parseBearer(req);
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    req.user = verifyAccess(token);
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
