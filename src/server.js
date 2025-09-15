import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDB } from './services/db.js';

// Logs globales para ver errores no capturados
process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED_REJECTION]', reason);
});
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT_EXCEPTION]', err);
  process.exit(1);
});

console.log('[BOOT] NODE_ENV =', env.nodeEnv);
console.log('[BOOT] Cargando app...');

const app = createApp();
let server;

async function start() {
  console.log('[BOOT] Conectando a Mongo...');
  await connectDB();

  console.log('[BOOT] Levantando HTTP en puerto', env.port);
  server = app.listen(env.port, () => {
    console.log(`[HTTP] Servidor escuchando en puerto ${env.port}`);
  });
}

start().catch((e) => {
  console.error('[BOOT] Falló el arranque:', e);
  process.exit(1);
});

// Cierre limpio (SIGINT/SIGTERM)
function shutdown(signal) {
  console.log(`[SYS] ${signal} recibido, cerrando...`);
  if (server) {
    server.close(() => {
      console.log('[HTTP] Servidor cerrado');
      process.exit(0);
    });
    setTimeout(() => process.exit(0), 5000).unref();
  } else {
    process.exit(0);
  }
}

['SIGINT', 'SIGTERM'].forEach(sig => process.on(sig, () => shutdown(sig)));
