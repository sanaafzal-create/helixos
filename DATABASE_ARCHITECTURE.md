# HelixOS Database Architecture

## Overview

HelixOS uses a production-ready, scalable architecture with Neon PostgreSQL and Drizzle ORM. All data is persisted to the database, with proper relationships, audit trails, and support for future AI enrichment and role-based permissions.

## Database Schema

### Core Tables

#### users
- Stores application users (coordinators, managers, admins)
- Fields: id, email, name, image, emailVerified, createdAt, updatedAt
- Role-based access control

#### organizations
- Multi-tenant support for different healthcare systems
- Fields: id, name, slug, logo, createdAt
- Each user belongs to an organization

### Healthcare Entities

#### members
- Patient/member records
- Fields: firstName, lastName, email, phone, dateOfBirth, address, city, state, zipCode
- Risk stratification: low, medium, high
- Unique memberId and groupNumber for insurance tracking

#### providers
- Healthcare providers (physicians, specialists, facilities)
- Fields: name, title, specialty, organization, email, phone, address
- Performance rating (1-5 stars)
- Status: active, inactive

### Care Coordination

#### cases
- Clinical care episodes or coordination workflows
- Types: care_coordination, disease_management, urgent_follow_up
- Status: pending, active, on_hold, closed
- Priority: low, medium, high
- Links members to providers

#### tasks
- Work items for coordinators
- Status tracking: open, in_progress, completed, cancelled
- Due date and assignment tracking
- Used for care coordination workflows

#### notes
- Clinical and administrative notes
- Types: general, clinical, restricted
- Audit trail of who wrote what and when
- Supports restricted access for sensitive information

#### outreach_activities
- Communication and engagement tracking
- Types: email, phone, in_person, follow_up
- Results and next steps documented
- Tracks provider and member engagement

### Audit & Security

#### activity_logs
- Complete audit trail of all changes
- Tracks: who, what, when, what changed
- Supports compliance requirements
- Used for AI enrichment to understand workflows

#### role_permissions
- Define permissions per role
- Roles: admin, manager, coordinator, viewer
- Extensible for custom roles

#### user_roles
- Assign roles to users within organizations
- Support for multiple roles per user

## Relationships

```
organizations
├── members (one-to-many)
├── providers (one-to-many)
├── users (through user_roles)
└── cases
    ├── tasks (one-to-many)
    ├── notes (one-to-many)
    └── outreach_activities (one-to-many)

members
└── cases (one-to-many)

providers
└── cases (one-to-many)
└── outreach_activities (one-to-many)
```

## Data Access Patterns

### Read (Queries)
- Get organization members with risk scores
- Get active cases for a user
- Get provider performance metrics
- Get activity feed for a case

### Write (Mutations)
- Create new case
- Update case status
- Add note to case
- Log outreach activity
- Create task

### Search
- Find members by name, email, phone
- Find providers by specialty, location
- Find cases by status, priority, member
- Full-text search on notes

## Security

- Row-level security (RLS) will be enabled per organization
- All queries scoped to organization context
- Audit logging for sensitive operations
- Email verification for user accounts
- Role-based access control (RBAC)

## Future Enhancements

### AI Enrichment
- Risk prediction models using member data
- Readmission prediction from activity logs
- Note summarization and extraction
- Automated care plan recommendations

### Integrations
- EHR system integration
- Claims data import
- Provider directories sync
- Real-time lab result ingestion

### Advanced Features
- Member communication preferences
- Insurance benefits tracking
- Care gap identification
- Quality metrics dashboarding

## Migration Strategy

Tables use `_new` suffix during migration period:
- `members_new` → `members` (after data validation)
- `providers_new` → `providers`
- `cases_new` → `cases`
- `tasks_new` → `tasks`
- `notes_new` → `notes`
- `outreach_activities_new` → `outreach_activities`

## Seed Data

Demo environment includes realistic data:
- 5 Users across different roles
- 1 Organization
- 3 Members with varying risk levels
- 3 Providers with different specialties
- 3 Active cases
- 15+ Tasks and notes
- 20+ Outreach activities
- Complete activity audit trail

