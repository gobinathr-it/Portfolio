# Gobinath R — Portfolio

A personal full-stack portfolio for **Gobinath R**, built with React, Django, and PostgreSQL. The site highlights work in backend systems, AI/LLM engineering, and applied software development. It includes a responsive UI and a contact API that persists enquiries to PostgreSQL.

## Stack

- **Frontend:** React 18, Vite, CSS
- **Backend:** Python, Django
- **Database:** PostgreSQL
- **Deployment-ready:** Docker Compose

## Run locally

### 1. Start PostgreSQL

```bash
docker compose up db -d
```

### 2. Start the API

```bash
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py runserver
```

### 3. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The frontend calls `http://localhost:8000/api/contact/` by default.

## Environment

Set `DATABASE_URL` in `backend/.env` for an external PostgreSQL instance. The local Docker configuration uses `portfolio_db`, `portfolio_user`, and `portfolio_password`.
