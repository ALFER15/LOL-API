# LOL-API

API REST para builds, campeones, counters y parches de League of Legends. Incluye autenticación con JWT (access/refresh), MongoDB con Mongoose y seeding inicial.

## 🚀 Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT (access ~15m, refresh ~7d)
- Nodemon para desarrollo

## 📂 Estructura (resumen)
```
src/
  app.js
  server.js
  config/env.js
  services/
    db.js
    password.service.js
    token.service.js
  middlewares/
    auth.js
    errorHandler.js
    notFound.js
  models/
    User.js
    Champion.js
    Build.js
    Counter.js
    Patch.js
  controllers/
    auth.controller.js
    champions.controller.js
    builds.controller.js
    counters.controller.js
    patches.controller.js
  routes/
    index.js
    auth.routes.js
    champions.routes.js
    builds.routes.js
    counters.routes.js
    patches.routes.js
  seed/
    seed.js
    data/
      champions.json
      builds.json
      counters.json
      patches.json
```
> Ajusta si tu estructura difiere.

## ⚙️ Configuración
1) Clonar e instalar
```bash
git clone https://github.com/ALFER15/LOL-API.git
cd LOL-API
npm install
```
2) Variables de entorno
- Copia `.env.example` a `.env` y completa tus valores.
3) Arranque en desarrollo
```bash
npm run dev
```
4) Arranque en producción
```bash
npm start
```

## 🧪 Seeding (carga de datos de ejemplo)
```bash
npm run seed
```
> Requiere `MONGO_URI` válido en `.env`.

## 🔐 Autenticación
- JWT de acceso (~15m) y refresh (~7d).
- Los endpoints protegidos requieren `Authorization: Bearer <token>`.

## 🔌 Variables de entorno
Ver [`.env.example`](./.env.example).

## 📜 Scripts recomendados en package.json
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "seed": "node src/seed/seed.js"
  }
}
```

## 🛣️ Endpoints (resumen)
Base URL: `http://localhost:${PORT}` (por defecto 3000). Prefijo sugerido: `/api`.

### Auth
| Método | Ruta              | Descripción                         | Body (JSON)                          |
|-------:|-------------------|-------------------------------------|--------------------------------------|
| POST   | /api/auth/register| Crear usuario                       | { "email", "password", "username" }  |
| POST   | /api/auth/login   | Iniciar sesión                      | { "email", "password" }              |
| POST   | /api/auth/refresh | Renovar token de acceso             | { "refreshToken" }                   |
| GET    | /api/auth/me      | Perfil del usuario (requiere JWT)   | —                                    |

### Champions
| Método | Ruta                | Descripción             |
|-------:|---------------------|-------------------------|
| GET    | /api/champions      | Listar campeones        |
| GET    | /api/champions/:id  | Detalle de campeón      |
| POST   | /api/champions      | Crear (JWT)             |
| PUT    | /api/champions/:id  | Actualizar (JWT)        |
| DELETE | /api/champions/:id  | Eliminar (JWT)          |

### Builds
| Método | Ruta             | Descripción            |
|-------:|------------------|------------------------|
| GET    | /api/builds      | Listar builds          |
| GET    | /api/builds/:id  | Detalle de build       |
| POST   | /api/builds      | Crear (JWT)            |
| PUT    | /api/builds/:id  | Actualizar (JWT)       |
| DELETE | /api/builds/:id  | Eliminar (JWT)         |

### Counters
| Método | Ruta               | Descripción            |
|-------:|--------------------|------------------------|
| GET    | /api/counters      | Listar counters        |
| GET    | /api/counters/:id  | Detalle                |
| POST   | /api/counters      | Crear (JWT)            |
| PUT    | /api/counters/:id  | Actualizar (JWT)       |
| DELETE | /api/counters/:id  | Eliminar (JWT)         |

### Patches
| Método | Ruta              | Descripción            |
|-------:|-------------------|------------------------|
| GET    | /api/patches      | Listar parches         |
| GET    | /api/patches/:id  | Detalle de parche      |
| POST   | /api/patches      | Crear (JWT)            |
| PUT    | /api/patches/:id  | Actualizar (JWT)       |
| DELETE | /api/patches/:id  | Eliminar (JWT)         |

> Si tus rutas reales difieren, avísame y lo ajusto.

## 🧾 Ejemplos rápidos (cURL)
```bash
# Registro
curl -X POST http://localhost:3000/api/auth/register   -H "Content-Type: application/json"   -d '{"email":"test@example.com","password":"123456","username":"tester"}'

# Login
curl -X POST http://localhost:3000/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"test@example.com","password":"123456"}'

# Champions (listado público)
curl http://localhost:3000/api/champions

# Crear campeón (requiere JWT)
curl -X POST http://localhost:3000/api/champions   -H "Authorization: Bearer <ACCESS_TOKEN>"   -H "Content-Type: application/json"   -d '{"name":"KaiSa","role":"ADC"}'
```

## 🧰 Consejos
- No subas `node_modules/` ni `.env`. Usa `.gitignore` y `.env.example`.
- Rota credenciales si alguna vez subiste `.env` al repo.
- Usa Postman/Insomnia o importa la colección adjunta (`LOL-API.postman_collection.json`).

---

Hecho con ❤️ para practicar y construir una API de LoL.
