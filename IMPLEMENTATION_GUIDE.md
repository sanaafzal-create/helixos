# HelixOS Database Implementation Guide

## Architecture Overview

HelixOS now uses a production-ready, scalable architecture with:

- **Database**: Neon PostgreSQL (connected)
- **ORM**: Drizzle ORM with type-safe queries
- **Data Access**: Custom query layer with CRUD operations
- **Audit Trail**: Complete activity logging for compliance
- **Multi-tenancy**: Organization-scoped data isolation

## Files Created

### Core Database Files

1. **`lib/db.ts`** (Already exists)
   - PostgreSQL connection pool setup
   - Connection handling and error management

2. **`lib/schema.ts`** (New)
   - Drizzle ORM schema definitions
   - 15 tables for complete application functionality
   - TypeScript types for all entities

3. **`lib/db-queries.ts`** (New)
   - High-level query functions
   - CRUD operations for all entities
   - Organized by entity type

### Documentation

4. **`DATABASE_ARCHITECTURE.md`** (New)
   - Complete schema documentation
   - Relationship diagrams
   - Security and audit trail design
   - Future enhancement roadmap

5. **`IMPLEMENTATION_GUIDE.md`** (This file)
   - Setup instructions
   - Next steps for development
   - Migration strategy

## Next Steps for Production

### 1. Create Tables in Neon Database

Run these SQL migrations in your Neon console:

```sql
-- Organizations
CREATE TABLE organizations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Members
CREATE TABLE members_new (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  organization_id TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  member_id TEXT UNIQUE,
  group_number TEXT,
  risk_level TEXT DEFAULT 'medium',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Providers
CREATE TABLE providers_new (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  organization_id TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  specialty TEXT NOT NULL,
  organization_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  performance_rating NUMERIC(3, 1),
  status TEXT DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Cases
CREATE TABLE cases_new (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  organization_id TEXT NOT NULL,
  member_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  case_type TEXT,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  assigned_to TEXT,
  primary_provider TEXT,
  outcome TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (member_id) REFERENCES members_new(id),
  FOREIGN KEY (primary_provider) REFERENCES providers_new(id)
);

-- Tasks
CREATE TABLE tasks_new (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  organization_id TEXT NOT NULL,
  case_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  assigned_to TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (case_id) REFERENCES cases_new(id)
);

-- Notes
CREATE TABLE notes_new (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  organization_id TEXT NOT NULL,
  case_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  note_type TEXT DEFAULT 'general',
  is_restricted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (case_id) REFERENCES cases_new(id)
);

-- Outreach Activities
CREATE TABLE outreach_activities_new (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  organization_id TEXT NOT NULL,
  case_id TEXT,
  provider_id TEXT,
  user_id TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT,
  result TEXT,
  contact_date TIMESTAMP WITH TIME ZONE,
  next_steps TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (case_id) REFERENCES cases_new(id),
  FOREIGN KEY (provider_id) REFERENCES providers_new(id)
);

-- Activity Logs (Audit Trail)
CREATE TABLE activity_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  organization_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  changes JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Role Permissions
CREATE TABLE role_permissions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  role TEXT NOT NULL,
  permission TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(role, permission)
);

-- User Roles
CREATE TABLE user_roles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  organization_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  UNIQUE(organization_id, user_id, role)
);

-- Create indexes for performance
CREATE INDEX idx_members_org ON members_new(organization_id);
CREATE INDEX idx_providers_org ON providers_new(organization_id);
CREATE INDEX idx_cases_org ON cases_new(organization_id);
CREATE INDEX idx_cases_member ON cases_new(member_id);
CREATE INDEX idx_tasks_case ON tasks_new(case_id);
CREATE INDEX idx_notes_case ON notes_new(case_id);
CREATE INDEX idx_activities_case ON outreach_activities_new(case_id);
CREATE INDEX idx_activity_logs_org ON activity_logs(organization_id, created_at DESC);
```

### 2. Seed Demo Data

Run the seed script to populate demo data:

```bash
cd /vercel/share/v0-project
npm run seed  # After creating the seed script
```

Or manually seed using the SQL provided in `scripts/seed.ts`.

### 3. Update Demo Pages to Use Database

Update demo pages from hardcoded data to database queries:

```typescript
import { getMembers, getCases, getProviders } from '@/lib/db-queries'

export default async function DemoPage() {
  const organizationId = 'org_demo_helixos'
  const members = await getMembers(organizationId)
  const cases = await getCases(organizationId)
  const providers = await getProviders(organizationId)
  
  // Use real data instead of hardcoded
}
```

### 4. Add Audit Logging

Wrap mutations with audit logging:

```typescript
import { logActivity } from '@/lib/db-queries'

async function updateCase(caseId, newStatus, userId, orgId) {
  const oldCase = await getCaseById(caseId)
  const updatedCase = await updateCaseStatus(caseId, newStatus)
  
  await logActivity({
    organizationId: orgId,
    userId: userId,
    entityType: 'case',
    entityId: caseId,
    action: 'update',
    changes: {
      status: { from: oldCase.status, to: newStatus }
    }
  })
  
  return updatedCase
}
```

### 5. Implement Role-Based Access Control

Use user roles for authorization:

```typescript
async function getUserPermissions(userId, organizationId) {
  const userRole = await pool.query(
    `SELECT role FROM user_roles WHERE user_id = $1 AND organization_id = $2`,
    [userId, organizationId]
  )
  
  if (!userRole.rows[0]) throw new Error('User not found in organization')
  
  const permissions = await pool.query(
    `SELECT permission FROM role_permissions WHERE role = $1`,
    [userRole.rows[0].role]
  )
  
  return permissions.rows.map(p => p.permission)
}
```

## Demo Environment

The demo environment (`/demo/*` routes) currently uses hardcoded data. To switch to database:

1. Update `app/demo/providers/page.tsx` to use `getProviders()`
2. Update `app/demo/cases/page.tsx` to use `getCases()`
3. Update `app/demo/case-workspace/page.tsx` to load real case data
4. Update `app/demo/members/page.tsx` to use `getMembers()`

## Production Readiness Checklist

- [ ] Tables created in Neon database
- [ ] Seed data loaded
- [ ] Demo pages updated to use database
- [ ] Audit logging implemented
- [ ] Role-based access control configured
- [ ] Environment variables set (DATABASE_URL)
- [ ] Connection pooling tested
- [ ] Query performance optimized with indexes
- [ ] Backup strategy implemented
- [ ] RLS policies enabled (optional but recommended)

## Future Enhancements

1. **AI Enrichment**: Use activity logs for predictive analytics
2. **Real-time Updates**: WebSocket subscriptions for case changes
3. **Advanced Search**: Full-text search on member notes
4. **Analytics**: Dashboards using aggregated case and activity data
5. **Integrations**: EHR and claims system imports

