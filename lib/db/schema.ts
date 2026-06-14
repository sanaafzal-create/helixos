import { text, timestamp, boolean, date, integer, pgTable } from 'drizzle-orm/pg-core'

// Better Auth tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// HelixOS application tables
export const providers = pgTable('providers', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  title: text('title'),
  organization: text('organization'),
  email: text('email'),
  phone: text('phone'),
  specialty: text('specialty'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zipCode'),
  notes: text('notes'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  deletedAt: timestamp('deletedAt'),
})

export const members = pgTable('members', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email'),
  phone: text('phone'),
  dateOfBirth: date('dateOfBirth'),
  gender: text('gender'),
  memberId: text('memberId'),
  groupNumber: text('groupNumber'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zipCode'),
  notes: text('notes'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  deletedAt: timestamp('deletedAt'),
})

export const cases = pgTable('cases', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  memberId: text('memberId').notNull(),
  status: text('status').notNull().default('open'),
  caseType: text('caseType'),
  description: text('description'),
  assignedTo: text('assignedTo'),
  outcome: text('outcome'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  closedAt: timestamp('closedAt'),
  deletedAt: timestamp('deletedAt'),
})

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  caseId: text('caseId').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').notNull().default('pending'),
  priority: text('priority').default('medium'),
  assignedTo: text('assignedTo'),
  dueDate: timestamp('dueDate'),
  completedAt: timestamp('completedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  deletedAt: timestamp('deletedAt'),
})

export const notes = pgTable('notes', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  caseId: text('caseId').notNull(),
  content: text('content').notNull(),
  noteType: text('noteType').default('general'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  deletedAt: timestamp('deletedAt'),
})

export const outreachActivities = pgTable('outreach_activities', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  caseId: text('caseId').notNull(),
  activityType: text('activityType').notNull(),
  description: text('description'),
  contactDate: timestamp('contactDate').notNull(),
  result: text('result'),
  nextSteps: text('nextSteps'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  deletedAt: timestamp('deletedAt'),
})

export const followUps = pgTable('follow_ups', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  caseId: text('caseId').notNull(),
  scheduledDate: timestamp('scheduledDate').notNull(),
  description: text('description'),
  type: text('type'),
  status: text('status').notNull().default('pending'),
  completedAt: timestamp('completedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  deletedAt: timestamp('deletedAt'),
})

export const activityLog = pgTable('activity_log', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  action: text('action').notNull(),
  entityType: text('entityType'),
  entityId: text('entityId'),
  changes: text('changes'),
  metadata: text('metadata'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
