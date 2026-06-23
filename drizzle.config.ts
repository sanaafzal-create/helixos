import type { Config } from 'drizzle-kit'

// Optional: for use with `drizzle-kit` (push / generate) once it is installed
// as a dev dependency. The canonical, dependency-free way to create the schema
// is `psql "$DATABASE_URL" -f lib/db/init.sql`.
export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
