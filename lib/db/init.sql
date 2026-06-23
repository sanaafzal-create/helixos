-- HelixOS database schema (matches lib/db/schema.ts)
-- Run once against your DATABASE_URL to create all tables:
--   psql "$DATABASE_URL" -f lib/db/init.sql
-- Column names are camelCase to match Better Auth / Drizzle, so they are quoted.

-- ============================================================================
-- Better Auth tables
-- ============================================================================

CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL DEFAULT false,
  "image" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY,
  "expiresAt" timestamp NOT NULL,
  "token" text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  "id" text PRIMARY KEY,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamp,
  "refreshTokenExpiresAt" timestamp,
  "scope" text,
  "password" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id" text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp DEFAULT now(),
  "updatedAt" timestamp DEFAULT now()
);

-- ============================================================================
-- HelixOS application tables
-- ============================================================================

CREATE TABLE IF NOT EXISTS "providers" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "name" text NOT NULL,
  "title" text,
  "organization" text,
  "email" text,
  "phone" text,
  "specialty" text,
  "address" text,
  "city" text,
  "state" text,
  "zipCode" text,
  "notes" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "deletedAt" timestamp
);

CREATE TABLE IF NOT EXISTS "members" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "email" text,
  "phone" text,
  "dateOfBirth" date,
  "gender" text,
  "memberId" text,
  "groupNumber" text,
  "address" text,
  "city" text,
  "state" text,
  "zipCode" text,
  "notes" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "deletedAt" timestamp
);

CREATE TABLE IF NOT EXISTS "cases" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "memberId" text NOT NULL,
  "status" text NOT NULL DEFAULT 'open',
  "caseType" text,
  "description" text,
  "assignedTo" text,
  "outcome" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "closedAt" timestamp,
  "deletedAt" timestamp
);

CREATE TABLE IF NOT EXISTS "tasks" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "caseId" text NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "status" text NOT NULL DEFAULT 'pending',
  "priority" text DEFAULT 'medium',
  "assignedTo" text,
  "dueDate" timestamp,
  "completedAt" timestamp,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "deletedAt" timestamp
);

CREATE TABLE IF NOT EXISTS "notes" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "caseId" text NOT NULL,
  "content" text NOT NULL,
  "noteType" text DEFAULT 'general',
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "deletedAt" timestamp
);

CREATE TABLE IF NOT EXISTS "outreach_activities" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "caseId" text NOT NULL,
  "activityType" text NOT NULL,
  "description" text,
  "contactDate" timestamp NOT NULL,
  "result" text,
  "nextSteps" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "deletedAt" timestamp
);

CREATE TABLE IF NOT EXISTS "follow_ups" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "caseId" text NOT NULL,
  "scheduledDate" timestamp NOT NULL,
  "description" text,
  "type" text,
  "status" text NOT NULL DEFAULT 'pending',
  "completedAt" timestamp,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "deletedAt" timestamp
);

CREATE TABLE IF NOT EXISTS "activity_log" (
  "id" text PRIMARY KEY,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "action" text NOT NULL,
  "entityType" text,
  "entityId" text,
  "changes" text,
  "metadata" text,
  "createdAt" timestamp NOT NULL DEFAULT now()
);

-- Helpful indexes for the most common lookups (per-user, soft-delete aware).
CREATE INDEX IF NOT EXISTS "idx_members_user" ON "members" ("userId");
CREATE INDEX IF NOT EXISTS "idx_providers_user" ON "providers" ("userId");
CREATE INDEX IF NOT EXISTS "idx_cases_user" ON "cases" ("userId");
CREATE INDEX IF NOT EXISTS "idx_tasks_user" ON "tasks" ("userId");
CREATE INDEX IF NOT EXISTS "idx_session_user" ON "session" ("userId");
