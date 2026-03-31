# The Hormuz Journal

Admin panel for managing news articles with AI-powered content generation. Backed by Supabase (PostgreSQL) and Express.

## Setup

```bash
# Frontend
npm install
npm run dev

# Backend (separate terminal)
cd server
npm install
cp .env.example .env   # add your Supabase + Gemini keys
npm run dev
```

## Environment Variables (server/.env)

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `GEMINI_API_KEY` | Google Gemini API key |
| `PORT` | Backend server port (default 3001) |

## Scripts

- `npm run dev` — start Vite dev server (frontend)
- `npm run build` — production build
- `cd server && npm run dev` — start Express backend
