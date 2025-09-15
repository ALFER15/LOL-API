import { Router } from 'express';
import { listPatches, getLatestPatch, getPatchByVersion } from '../controllers/patches.controller.js';

const r = Router();

r.get('/', listPatches);
r.get('/latest', getLatestPatch);
r.get('/:version', getPatchByVersion);

export default r;
