# helixos

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_xvIiRkkYj1bYoxsrr4GGODUQNQqa)

## Stack

- **Framework:** Next.js (App Router), React 19, Tailwind v4
- **Auth:** [Better Auth](https://www.better-auth.com/) (email + password)
- **Database:** PostgreSQL via Drizzle ORM (`node-postgres`)

## Environment & Database Setup

1. Copy `.env.example` to `.env.local` and fill in the values:
   - `DATABASE_URL` — your PostgreSQL connection string
   - `BETTER_AUTH_URL` — app URL (defaults to `http://localhost:3000` in dev)
   - `BETTER_AUTH_SECRET` — required in production (`openssl rand -base64 32`)
2. Create the tables (Better Auth + application schema):
   ```bash
   pnpm db:init
   # or: psql "$DATABASE_URL" -f lib/db/init.sql
   ```
   The schema is defined in `lib/db/schema.ts`; `lib/db/init.sql` mirrors it.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
