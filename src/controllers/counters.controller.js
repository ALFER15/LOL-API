import { Counter } from '../models/Counter.js';
import { Patch } from '../models/Patch.js';

export async function getChampionCounters(req, res, next) {
  try {
    const { id } = req.params;
    let { role, elo, patch, page = 1, limit = 20 } = req.query;

    if (!role || !elo) {
      return res.status(400).json({ error: 'role and elo are required' });
    }

    if (!patch || patch === 'latest') {
      const latest = await Patch.findOne().sort({ releasedAt: -1 });
      patch = latest?.version;
    }

    const q = { championId: id, role, elo, patch };
    const data = await Counter.find(q)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({ data });
  } catch (err) {
    next(err);
  }
}
