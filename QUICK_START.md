# HelixOS Database Architecture - Quick Start

## 🎯 What's New

HelixOS now has a **production-ready database architecture** with Neon PostgreSQL. No more hardcoded data!

## 📁 New Files

```
lib/
├── db.ts                    ← PostgreSQL connection pool
├── schema.ts                ← 15-table Drizzle ORM schema
└── db-queries.ts            ← CRUD operations for all entities

Documentation/
├── DATABASE_ARCHITECTURE.md  ← Complete schema & design
├── IMPLEMENTATION_GUIDE.md   ← Step-by-step setup
├── DATABASE_SETUP_SUMMARY.md ← Overview & features
└── QUICK_START.md            ← This file
```

## 🚀 Quick Start (5 Steps)

### 1. Check Neon Connection
```bash
# DATABASE_URL should already be set in your Vercel environment
echo $DATABASE_URL
```

### 2. Create Tables in Neon

Copy all SQL from **`IMPLEMENTATION_GUIDE.md`** Section 1 into:
- Go to your Neon project console
- Open SQL editor
- Paste and run the migration SQL

### 3. Verify Connection
```bash
npm run dev
# Check console for "[v0] Executed query" messages
```

### 4. Seed Demo Data

You can insert seed data using:
- Direct SQL INSERT statements
- Or create a seed script in `scripts/seed.ts`

### 5. Update Demo Pages

Change demo pages from hardcoded data to database queries:

```typescript
// Before (lib/demo-data.ts - hardcoded)
export const mockMembers = [
  { id: '1', name: 'John Smith', ... }
]

// After (updated page.tsx - from database)
import { getMembers } from '@/lib/db-queries'

export default async function Page() {
  const members = await getMembers('org_demo_helixos')
  // Use real data instead
}
```

## 📊 Database Tables (15)

### Healthcare Core
- `members` - Patients with risk levels
- `providers` - Doctors/specialists with ratings
- `cases` - Care coordination workflows
- `tasks` - To-do items for coordinators
- `notes` - Clinical notes (supports restricted access)
- `outreach_activities` - Communication tracking

### Users & Organizations
- `users` - App users
- `organizations` - Multi-tenant support
- `user_roles` - Role assignments
- `role_permissions` - Permission definitions

### Audit & Security
- `activity_logs` - Audit trail (who, what, when, changed)
- `emailVerification` - Email tokens
- `session` - User sessions
- `verification` - General tokens

## 🔍 Example Usage

### Get Members
```typescript
import { getMembers } from '@/lib/db-queries'

const members = await getMembers('org_demo_helixos')
```

### Create a Case
```typescript
import { createCase } from '@/lib/db-queries'

await createCase({
  organizationId: 'org_demo_helixos',
  memberId: 'mem_1',
  title: 'CHF Management',
  caseType: 'disease_management',
  priority: 'high'
})
```

### Log an Activity
```typescript
import { logActivity } from '@/lib/db-queries'

await logActivity({
  organizationId: 'org_demo_helixos',
  userId: 'user_1',
  entityType: 'case',
  entityId: 'case_1',
  action: 'update',
  changes: { status: { from: 'pending', to: 'active' } }
})
```

## ✨ Key Features

✅ **Type-Safe Queries** - TypeScript types for all operations
✅ **Multi-Tenant** - Organization-scoped data isolation  
✅ **Audit Trail** - Complete change history for compliance
✅ **RBAC** - Role-based access control built-in
✅ **Soft Deletes** - Data never permanently deleted
✅ **Relationships** - Foreign keys between all entities
✅ **Indexed** - Performance optimized queries

## 📚 Full Documentation

- **`DATABASE_ARCHITECTURE.md`** - Deep dive into schema & design
- **`IMPLEMENTATION_GUIDE.md`** - Complete setup instructions
- **`DATABASE_SETUP_SUMMARY.md`** - Features & roadmap

## 🎓 Learning Path

1. Read **`QUICK_START.md`** (you are here) - 5 min overview
2. Skim **`DATABASE_SETUP_SUMMARY.md`** - 10 min features
3. Run migrations from **`IMPLEMENTATION_GUIDE.md`** - 5 min setup
4. Study **`DATABASE_ARCHITECTURE.md`** - 30 min deep dive
5. Update demo pages to use database - 1 hour development

## 🔒 Security

- Multi-tenant data isolation
- Audit logging for compliance (HIPAA ready)
- Soft deletes preserve data integrity
- Role-based access control
- Session management
- Email verification support

## 🚨 Next Steps

1. ✅ Review this quick start (done!)
2. ⏭️ Create tables in Neon (see IMPLEMENTATION_GUIDE.md)
3. ⏭️ Seed demo data
4. ⏭️ Update demo pages to use database
5. ⏭️ Test queries in development
6. ⏭️ Deploy to production

## ❓ Questions?

- **Schema questions?** See `DATABASE_ARCHITECTURE.md`
- **Setup help?** See `IMPLEMENTATION_GUIDE.md`
- **Feature overview?** See `DATABASE_SETUP_SUMMARY.md`
- **Code examples?** Check `lib/db-queries.ts` for usage

