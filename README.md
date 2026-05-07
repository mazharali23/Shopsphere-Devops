# ShopSphere

Modern, scalable e-commerce web application with **React + Vite + Tailwind + Redux Toolkit** (frontend) and **Node.js + Express + PostgreSQL** (backend), packaged with **Docker Compose**.

## Tech stack
- **Frontend**: React (Vite), TailwindCSS, Axios, React Router, Redux Toolkit
- **Backend**: Node.js, Express.js, JWT auth, bcrypt, Zod validation, MVC-ish layering (controllers/services/models)
- **DB**: PostgreSQL (UUID primary keys + constraints)
- **Security**: Helmet, CORS, input validation, env vars
- **Containers**: Docker + Compose (frontend + backend + postgres)

## Project structure
```
ShopSphere/
  backend/
  frontend/
  db/init/
  docs/
```

## Quick start (Docker)
From `ShopSphere/`:
```bash
docker compose up -d --build
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000/health`
- API base: `http://localhost:4000/api/v1`

## Environment variables
- Copy `./.env.example` → `./.env` (optional; compose already has defaults)
- Backend env:
  - Copy `backend/.env.example` → `backend/.env` and set `JWT_ACCESS_SECRET` to a long random string
- Frontend env (optional for local dev):
  - Copy `frontend/.env.example` → `frontend/.env`

## Local dev (no Docker)
### 1) Database
Run Postgres (recommended via Docker):
```bash
docker compose up -d postgres
```

### 2) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## API docs
See `docs/API.md`.

## Notes
- This starter keeps orders simple: **checkout creates a `paid` order** (no payment gateway integration).
- Secrets are never hardcoded; update `.env` values before real deployments.

