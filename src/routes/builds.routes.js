import { Router } from 'express';
import { findBuilds, getChampionRecommendedBuild } from '../controllers/builds.controller.js';

const r = Router();

r.get('/', findBuilds);
r.get('/champion/:id', getChampionRecommendedBuild);

export default r;
