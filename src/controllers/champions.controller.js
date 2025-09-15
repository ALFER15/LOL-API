import { Champion } from '../models/Champion.js';

// GET /v1/champions?role=mid&page=1&limit=20
export async function listChampions(req, res, next) {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const q = {};
    if (role) q.roles = role;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Champion.countDocuments(q);
    const data = await Champion.find(q)
      .sort({ name: 1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)) || 1,
      data,
    });
  } catch (err) {
    next(err);
  }
}

// GET /v1/champions/:id
export async function getChampion(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Champion.findOne({ id });
    if (!doc) return res.status(404).json({ error: 'Champion not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

// POST /v1/champions
export async function createChampion(req, res, next) {
  try {
    const doc = await Champion.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

// PATCH /v1/champions/:id
export async function updateChampion(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Champion.findOneAndUpdate(
      { id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'Champion not found' });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

// DELETE /v1/champions/:id
export async function deleteChampion(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Champion.findOneAndDelete({ id });
    if (!doc) return res.status(404).json({ error: 'Champion not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
