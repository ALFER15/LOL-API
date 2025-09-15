import { Router } from 'express';
import authRoutes from './auth.routes.js';
import championsRoutes from './champions.routes.js';
import patchesRoutes from './patches.routes.js';
import buildsRoutes from './builds.routes.js';
import countersRoutes from './counters.routes.js';

export const router = Router();

// Healthcheck
router.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Versión 1 de la API
const v1 = Router();
v1.use('/auth', authRoutes);
v1.use('/champions', championsRoutes);
v1.use('/patches', patchesRoutes);
v1.use('/builds', buildsRoutes);
v1.use('/counters', countersRoutes);

router.use('/v1', v1);
