# Tuali Driver — Backend API

API REST para la plataforma Tuali Driver, construida con Node.js y Express.

## Stack

- **Runtime:** Node.js 20
- **Framework:** Express 4
- **Testing:** Jest + Supertest
- **Linter:** ESLint

## Setup rápido

```bash
git clone git@github.com:mich0rtega/Tuali_Driver.git
cd Tuali_Driver
npm install
cp .env.example .env   # llenar con tus valores
npm run dev
```

La API queda disponible en `http://localhost:3000`.

| Endpoint | Descripción |
|----------|-------------|
| `GET /health` | Estado del servidor |
| `GET /api` | Info de la API |

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor con hot-reload |
| `npm start` | Servidor de producción |
| `npm test` | Tests con cobertura |
| `npm run lint` | Revisar estilo |

## Contribuir

Lee [CONTRIBUTING.md](./CONTRIBUTING.md) para el flujo de ramas, convención de commits y cómo abrir PRs.
