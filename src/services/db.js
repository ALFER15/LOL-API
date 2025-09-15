import mongoose from 'mongoose';
import { env } from '../config/env.js';

export async function connectDB() {
  mongoose.set('strictQuery', true);
  try {
    const safeUri = env.mongoUri.replace(/\/\/.*@/, '//<creds>@'); // oculta credenciales si hubiera
    console.log('[DB] Intentando conectar a', safeUri);
    await mongoose.connect(env.mongoUri, {
      autoIndex: env.nodeEnv !== 'production',
      serverSelectionTimeoutMS: 5000
    });
    console.log('[DB] Conectado a MongoDB');
  } catch (err) {
    console.error('[DB] Error de conexión:', err?.message);
    console.error(err);
    process.exit(1);
  }
}
