'use server'

import { auth } from '@/lib/auth'
// import { db } from '@/lib/db'
import { headers } from 'next/headers'
import { eq, and } from 'drizzle-orm'
import * as schema from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Case Actions
export async function getCases() {
  const userId = await getUserId()
  return db
    .select()
    .from(schema.cases)
    .where(and(eq(schema.cases.userId, userId), eq(schema.cases.deletedAt, null)))
}

export async function createCase(data: {
  memberId: string
  status?: string
  caseType?: string
  description?: string
}) {
  const userId = await getUserId()
  const id = `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  await db.insert(schema.cases).values({
    id,
    userId,
    ...data,
  })
  
  revalidatePath('/cases')
  return { id }
}

export async function updateCase(id: string, data: Partial<typeof data>) {
  const userId = await getUserId()
  
  await db
    .update(schema.cases)
    .set(data)
    .where(and(eq(schema.cases.id, id), eq(schema.cases.userId, userId)))
  
  revalidatePath('/cases')
}

export async function deleteCase(id: string) {
  const userId = await getUserId()
  
  await db
    .update(schema.cases)
    .set({ deletedAt: new Date() })
    .where(and(eq(schema.cases.id, id), eq(schema.cases.userId, userId)))
  
  revalidatePath('/cases')
}

// Task Actions
export async function getTasks() {
  const userId = await getUserId()
  return db
    .select()
    .from(schema.tasks)
    .where(and(eq(schema.tasks.userId, userId), eq(schema.tasks.deletedAt, null)))
}

export async function createTask(data: {
  caseId: string
  title: string
  description?: string
  priority?: string
  dueDate?: Date
}) {
  const userId = await getUserId()
  const id = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  await db.insert(schema.tasks).values({
    id,
    userId,
    ...data,
  })
  
  revalidatePath('/tasks')
  return { id }
}

export async function updateTask(id: string, data: Partial<typeof data>) {
  const userId = await getUserId()
  
  await db
    .update(schema.tasks)
    .set(data)
    .where(and(eq(schema.tasks.id, id), eq(schema.tasks.userId, userId)))
  
  revalidatePath('/tasks')
}

export async function completeTask(id: string) {
  const userId = await getUserId()
  
  await db
    .update(schema.tasks)
    .set({ status: 'completed', completedAt: new Date() })
    .where(and(eq(schema.tasks.id, id), eq(schema.tasks.userId, userId)))
  
  revalidatePath('/tasks')
}

export async function deleteTask(id: string) {
  const userId = await getUserId()
  
  await db
    .update(schema.tasks)
    .set({ deletedAt: new Date() })
    .where(and(eq(schema.tasks.id, id), eq(schema.tasks.userId, userId)))
  
  revalidatePath('/tasks')
}
