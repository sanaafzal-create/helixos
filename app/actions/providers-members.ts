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

// Provider Actions
export async function getProviders() {
  const userId = await getUserId()
  return db
    .select()
    .from(schema.providers)
    .where(and(eq(schema.providers.userId, userId), eq(schema.providers.deletedAt, null)))
}

export async function createProvider(data: {
  name: string
  title?: string
  organization?: string
  email?: string
  phone?: string
  specialty?: string
}) {
  const userId = await getUserId()
  const id = `provider_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  await db.insert(schema.providers).values({
    id,
    userId,
    ...data,
  })
  
  revalidatePath('/providers')
  return { id }
}

export async function updateProvider(id: string, data: Partial<typeof data>) {
  const userId = await getUserId()
  
  await db
    .update(schema.providers)
    .set(data)
    .where(and(eq(schema.providers.id, id), eq(schema.providers.userId, userId)))
  
  revalidatePath('/providers')
}

export async function deleteProvider(id: string) {
  const userId = await getUserId()
  
  await db
    .update(schema.providers)
    .set({ deletedAt: new Date() })
    .where(and(eq(schema.providers.id, id), eq(schema.providers.userId, userId)))
  
  revalidatePath('/providers')
}

// Member Actions
export async function getMembers() {
  const userId = await getUserId()
  return db
    .select()
    .from(schema.members)
    .where(and(eq(schema.members.userId, userId), eq(schema.members.deletedAt, null)))
}

export async function createMember(data: {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  dateOfBirth?: string
  gender?: string
}) {
  const userId = await getUserId()
  const id = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  await db.insert(schema.members).values({
    id,
    userId,
    ...data,
  })
  
  revalidatePath('/members')
  return { id }
}

export async function updateMember(id: string, data: Partial<typeof data>) {
  const userId = await getUserId()
  
  await db
    .update(schema.members)
    .set(data)
    .where(and(eq(schema.members.id, id), eq(schema.members.userId, userId)))
  
  revalidatePath('/members')
}

export async function deleteMember(id: string) {
  const userId = await getUserId()
  
  await db
    .update(schema.members)
    .set({ deletedAt: new Date() })
    .where(and(eq(schema.members.id, id), eq(schema.members.userId, userId)))
  
  revalidatePath('/members')
}
