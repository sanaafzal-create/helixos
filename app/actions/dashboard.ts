'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { eq, and } from 'drizzle-orm'
import * as schema from '@/lib/db/schema'

export async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getCasesForUser() {
  const userId = await getUserId()
  return db
    .select()
    .from(schema.cases)
    .where(and(eq(schema.cases.userId, userId), eq(schema.cases.status, 'open')))
}

export async function getTasksForUser() {
  const userId = await getUserId()
  return db
    .select()
    .from(schema.tasks)
    .where(and(eq(schema.tasks.userId, userId), eq(schema.tasks.status, 'pending')))
}

export async function getFollowUpsForUser() {
  const userId = await getUserId()
  return db
    .select()
    .from(schema.followUps)
    .where(and(eq(schema.followUps.userId, userId), eq(schema.followUps.status, 'pending')))
}

export async function getMembersCount() {
  const userId = await getUserId()
  const result = await db
    .select({ count: schema.members.id })
    .from(schema.members)
    .where(eq(schema.members.userId, userId))
  return result[0]?.count || 0
}

export async function getProvidersCount() {
  const userId = await getUserId()
  const result = await db
    .select({ count: schema.providers.id })
    .from(schema.providers)
    .where(eq(schema.providers.userId, userId))
  return result[0]?.count || 0
}
