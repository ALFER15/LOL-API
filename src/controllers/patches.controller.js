import { Patch } from '../models/Patch.js';

export async function listPatches(_req, res, next) {
  try {
    const data = await Patch.find().sort({ releasedAt: -1 });
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

export async function getLatestPatch(_req, res, next) {
  try {
    const doc = await Patch.findOne().sort({ releasedAt: -1 });
    if (!doc) return res.status(404).json({ error: 'No patches' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

export async function getPatchByVersion(req, res, next) {
  try {
    const { version } = req.params;
    const doc = await Patch.findOne({ version });
    if (!doc) return res.status(404).json({ error: 'Patch not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}
