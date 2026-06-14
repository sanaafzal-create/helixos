'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { eq, and, or, like } from 'drizzle-orm'
import * as schema from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function globalSearch(query: string) {
  const userId = await getUserId()
  
  if (!query || query.length < 2) {
    return { providers: [], members: [], cases: [], tasks: [] }
  }

  const searchQuery = `%${query}%`

  const [providers, members, cases, tasks] = await Promise.all([
    db
      .select()
      .from(schema.providers)
      .where(
        and(
          eq(schema.providers.userId, userId),
          eq(schema.providers.deletedAt, null),
          or(
            like(schema.providers.name, searchQuery),
            like(schema.providers.organization, searchQuery),
            like(schema.providers.email, searchQuery)
          )
        )
      )
      .limit(5),
    db
      .select()
      .from(schema.members)
      .where(
        and(
          eq(schema.members.userId, userId),
          eq(schema.members.deletedAt, null),
          or(
            like(schema.members.firstName, searchQuery),
            like(schema.members.lastName, searchQuery),
            like(schema.members.email, searchQuery),
            like(schema.members.memberId, searchQuery)
          )
        )
      )
      .limit(5),
    db
      .select()
      .from(schema.cases)
      .where(
        and(
          eq(schema.cases.userId, userId),
          eq(schema.cases.deletedAt, null),
          like(schema.cases.description, searchQuery)
        )
      )
      .limit(5),
    db
      .select()
      .from(schema.tasks)
      .where(
        and(
          eq(schema.tasks.userId, userId),
          eq(schema.tasks.deletedAt, null),
          or(
            like(schema.tasks.title, searchQuery),
            like(schema.tasks.description, searchQuery)
          )
        )
      )
      .limit(5),
  ])

  return { providers, members, cases, tasks }
}

export async function getActivityLog() {
  const userId = await getUserId()
  return db
    .select()
    .from(schema.activityLog)
    .where(eq(schema.activityLog.userId, userId))
    .orderBy(schema.activityLog.createdAt)
    .limit(50)
}

export async function logActivity(action: string, entityType: string, entityId: string, changes?: string) {
  const userId = await getUserId()
  const id = `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  await db.insert(schema.activityLog).values({
    id,
    userId,
    action,
    entityType,
    entityId,
    changes,
  })
}
