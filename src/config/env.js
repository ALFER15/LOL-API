import 'dotenv/config';

const required = ['PORT', 'MONGO_URI', 'CORS_ORIGINS', 'JWT_SECRET'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Faltan variables de entorno: ${missing.join(', ')}`);
  process.exit(1);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  corsOrigins: process.env.CORS_ORIGINS.split(',').map(s => s.trim()),
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    accessTtl: process.env.JWT_ACCESS_TTL || '15m',
    refreshTtl: process.env.JWT_REFRESH_TTL || '7d',
  },
  resetTokenTtlMin: Number(process.env.RESET_TOKEN_TTL_MIN || 15),
};
