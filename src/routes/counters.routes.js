import { Router } from 'express';
import { getChampionCounters } from '../controllers/counters.controller.js';

const r = Router();

r.get('/champion/:id', getChampionCounters);

export default r;
