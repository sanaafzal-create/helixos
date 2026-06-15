import { pgTable, text, timestamp, uuid, date, jsonb, boolean, varchar, numeric } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

// ============================================================================
// USERS & ORGANIZATIONS
// ============================================================================

export const users = pgTable('users', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').unique().notNull(),
  name: text('name'),
  image: text('image'),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const organizations = pgTable('organizations', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  slug: text('slug').unique(),
  logo: text('logo'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ============================================================================
// HEALTHCARE ENTITIES
// ============================================================================

export const members = pgTable('members_new', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: text('organization_id').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  dateOfBirth: date('date_of_birth'),
  gender: text('gender'), // 'M', 'F', 'Other'
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zip_code'),
  memberId: text('member_id').unique(),
  groupNumber: text('group_number'),
  riskLevel: text('risk_level').default('medium'), // 'low', 'medium', 'high'
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
})

export const providers = pgTable('providers_new', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: text('organization_id').notNull(),
  name: text('name').notNull(),
  title: text('title'),
  specialty: text('specialty').notNull(),
  organization: text('organization_name'),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zip_code'),
  performanceRating: numeric('performance_rating', { precision: 3, scale: 1 }),
  status: text('status').default('active'), // 'active', 'inactive'
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
})

// ============================================================================
// CASES & CASE MANAGEMENT
// ============================================================================

export const cases = pgTable('cases_new', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: text('organization_id').notNull(),
  memberId: text('member_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  caseType: text('case_type'), // 'care_coordination', 'disease_management', 'urgent_follow_up'
  status: text('status').default('pending'), // 'pending', 'active', 'on_hold', 'closed'
  priority: text('priority').default('medium'), // 'low', 'medium', 'high'
  assignedTo: text('assigned_to'), // user_id
  primaryProvider: text('primary_provider'), // provider_id
  outcome: text('outcome'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  closedAt: timestamp('closed_at', { withTimezone: true }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
})

// ============================================================================
// TASKS & ACTIVITIES
// ============================================================================

export const tasks = pgTable('tasks_new', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: text('organization_id').notNull(),
  caseId: text('case_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').default('open'), // 'open', 'in_progress', 'completed', 'cancelled'
  priority: text('priority').default('medium'), // 'low', 'medium', 'high'
  assignedTo: text('assigned_to'), // user_id
  dueDate: timestamp('due_date', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
})

export const notes = pgTable('notes_new', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: text('organization_id').notNull(),
  caseId: text('case_id').notNull(),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  noteType: text('note_type').default('general'), // 'general', 'clinical', 'restricted'
  isRestricted: boolean('is_restricted').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
})

export const outreachActivities = pgTable('outreach_activities_new', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: text('organization_id').notNull(),
  caseId: text('case_id'),
  providerId: text('provider_id'),
  userId: text('user_id').notNull(),
  activityType: text('activity_type').notNull(), // 'email', 'phone', 'in_person', 'follow_up'
  description: text('description'),
  result: text('result'),
  contactDate: timestamp('contact_date', { withTimezone: true }),
  nextSteps: text('next_steps'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
})

// ============================================================================
// AUDIT & PERMISSIONS
// ============================================================================

export const activityLogs = pgTable('activity_logs', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: text('organization_id').notNull(),
  userId: text('user_id').notNull(),
  entityType: text('entity_type').notNull(), // 'case', 'task', 'member', 'provider'
  entityId: text('entity_id').notNull(),
  action: text('action').notNull(), // 'create', 'update', 'delete', 'view'
  changes: jsonb('changes'), // old and new values
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const rolePermissions = pgTable('role_permissions', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  role: text('role').notNull(), // 'admin', 'manager', 'coordinator', 'viewer'
  permission: text('permission').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const userRoles = pgTable('user_roles', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  organizationId: text('organization_id').notNull(),
  userId: text('user_id').notNull(),
  role: text('role').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export type User = typeof users.$inferSelect
export type Member = typeof members.$inferSelect
export type Provider = typeof providers.$inferSelect
export type Case = typeof cases.$inferSelect
export type Task = typeof tasks.$inferSelect
export type Note = typeof notes.$inferSelect
export type OutreachActivity = typeof outreachActivities.$inferSelect
