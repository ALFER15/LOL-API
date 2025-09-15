import { Router } from 'express';
import { authRequired } from '../middlewares/auth.js';
import {
  listChampions,
  getChampion,
  createChampion,
  updateChampion,
  deleteChampion,
} from '../controllers/champions.controller.js';

const r = Router();

// Lectura pública
r.get('/', listChampions);
r.get('/:id', getChampion);

// Escritura protegida
r.post('/', authRequired, createChampion);
r.patch('/:id', authRequired, updateChampion);
r.delete('/:id', authRequired, deleteChampion);

export default r;
