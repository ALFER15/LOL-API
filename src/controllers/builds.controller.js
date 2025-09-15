import { Build } from '../models/Build.js';
import { Patch } from '../models/Patch.js';

export async function findBuilds(req, res, next) {
  try {
    let { championId, role, elo, patch, page = 1, limit = 20 } = req.query;

    if (!patch || patch === 'latest') {
      const latest = await Patch.findOne().sort({ releasedAt: -1 });
      patch = latest?.version;
    }

    const q = {};
    if (championId) q.championId = championId;
    if (role) q.role = role;
    if (elo) q.elo = elo;
    if (patch) q.patch = patch;

    const data = await Build.find(q)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({ data });
  } catch (err) {
    next(err);
  }
}

export async function getChampionRecommendedBuild(req, res, next) {
  try {
    const { id } = req.params;
    let { role, elo, patch } = req.query;

    if (!role || !elo) {
      return res.status(400).json({ error: 'role and elo are required' });
    }

    if (!patch || patch === 'latest') {
      const latest = await Patch.findOne().sort({ releasedAt: -1 });
      patch = latest?.version;
    }

    const doc = await Build.findOne({ championId: id, role, elo, patch });
    if (!doc) return res.status(404).json({ error: 'Build not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}
