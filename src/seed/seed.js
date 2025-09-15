import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { Champion } from '../models/Champion.js';
import { Patch } from '../models/Patch.js';
import { Build } from '../models/Build.js';
import { Counter } from '../models/Counter.js'; // <-- NUEVO

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');

async function loadJson(name) {
  const p = path.join(dataDir, name);
  const raw = await readFile(p, 'utf-8');
  return JSON.parse(raw);
}

async function main() {
  console.log('[SEED] Conectando a Mongo...');
  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 5000 });
  console.log('[SEED] Conectado');

  const champions = await loadJson('champions.json');
  const patches = await loadJson('patches.json');
  const builds = await loadJson('builds.json');
  const counters = await loadJson('counters.json'); // <-- NUEVO

  console.log('[SEED] Limpiando colecciones...');
  await Champion.deleteMany({});
  await Patch.deleteMany({});
  await Build.deleteMany({});
  await Counter.deleteMany({}); // <-- NUEVO

  console.log('[SEED] Insertando champions:', champions.length);
  await Champion.insertMany(champions);

  console.log('[SEED] Insertando patches:', patches.length);
  await Patch.insertMany(patches);

  console.log('[SEED] Insertando builds:', builds.length);
  await Build.insertMany(builds);

  console.log('[SEED] Insertando counters:', counters.length); // <-- NUEVO
  await Counter.insertMany(counters); // <-- NUEVO

  console.log('[SEED] OK ✅');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('[SEED] Error:', err);
  process.exit(1);
});
