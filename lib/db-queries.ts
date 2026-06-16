import { pool } from './db'
import type { Member, Provider, Case, Task, Note, OutreachActivity } from './schema'

// ============================================================================
// MEMBERS
// ============================================================================

export async function getMembers(organizationId: string): Promise<Member[]> {
  const result = await pool.query(
    `SELECT * FROM members_new WHERE organization_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC`,
    [organizationId]
  )
  return result.rows
}

export async function getMemberById(id: string): Promise<Member | null> {
  const result = await pool.query(
    `SELECT * FROM members_new WHERE id = $1 AND deleted_at IS NULL`,
    [id]
  )
  return result.rows[0] || null
}

export async function createMember(member: any): Promise<Member> {
  const result = await pool.query(
    `INSERT INTO members_new (
      organization_id, first_name, last_name, email, phone, date_of_birth, gender,
      address, city, state, zip_code, member_id, group_number, risk_level, notes
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *`,
    [
      member.organizationId,
      member.firstName,
      member.lastName,
      member.email,
      member.phone,
      member.dateOfBirth,
      member.gender,
      member.address,
      member.city,
      member.state,
      member.zipCode,
      member.memberId,
      member.groupNumber,
      member.riskLevel || 'medium',
      member.notes,
    ]
  )
  return result.rows[0]
}

// ============================================================================
// PROVIDERS
// ============================================================================

export async function getProviders(organizationId: string): Promise<Provider[]> {
  const result = await pool.query(
    `SELECT * FROM providers_new WHERE organization_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC`,
    [organizationId]
  )
  return result.rows
}

export async function getProviderById(id: string): Promise<Provider | null> {
  const result = await pool.query(
    `SELECT * FROM providers_new WHERE id = $1 AND deleted_at IS NULL`,
    [id]
  )
  return result.rows[0] || null
}

export async function createProvider(provider: any): Promise<Provider> {
  const result = await pool.query(
    `INSERT INTO providers_new (
      organization_id, name, title, specialty, organization_name, email, phone,
      address, city, state, zip_code, performance_rating, status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *`,
    [
      provider.organizationId,
      provider.name,
      provider.title,
      provider.specialty,
      provider.organization,
      provider.email,
      provider.phone,
      provider.address,
      provider.city,
      provider.state,
      provider.zipCode,
      provider.performanceRating,
      provider.status || 'active',
    ]
  )
  return result.rows[0]
}

// ============================================================================
// CASES
// ============================================================================

export async function getCases(organizationId: string): Promise<Case[]> {
  const result = await pool.query(
    `SELECT * FROM cases_new WHERE organization_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC`,
    [organizationId]
  )
  return result.rows
}

export async function getCaseById(id: string): Promise<Case | null> {
  const result = await pool.query(
    `SELECT * FROM cases_new WHERE id = $1 AND deleted_at IS NULL`,
    [id]
  )
  return result.rows[0] || null
}

export async function getCasesByMember(memberId: string): Promise<Case[]> {
  const result = await pool.query(
    `SELECT * FROM cases_new WHERE member_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC`,
    [memberId]
  )
  return result.rows
}

export async function createCase(caseData: any): Promise<Case> {
  const result = await pool.query(
    `INSERT INTO cases_new (
      organization_id, member_id, title, description, case_type,
      status, priority, assigned_to, primary_provider
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [
      caseData.organizationId,
      caseData.memberId,
      caseData.title,
      caseData.description,
      caseData.caseType,
      caseData.status || 'pending',
      caseData.priority || 'medium',
      caseData.assignedTo,
      caseData.primaryProvider,
    ]
  )
  return result.rows[0]
}

export async function updateCaseStatus(caseId: string, status: string): Promise<Case> {
  const result = await pool.query(
    `UPDATE cases_new SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, caseId]
  )
  return result.rows[0]
}

// ============================================================================
// TASKS
// ============================================================================

export async function getTasks(organizationId: string): Promise<Task[]> {
  const result = await pool.query(
    `SELECT * FROM tasks_new WHERE organization_id = $1 AND deleted_at IS NULL ORDER BY due_date ASC`,
    [organizationId]
  )
  return result.rows
}

export async function getTasksByCase(caseId: string): Promise<Task[]> {
  const result = await pool.query(
    `SELECT * FROM tasks_new WHERE case_id = $1 AND deleted_at IS NULL ORDER BY due_date ASC`,
    [caseId]
  )
  return result.rows
}

export async function createTask(task: any): Promise<Task> {
  const result = await pool.query(
    `INSERT INTO tasks_new (
      organization_id, case_id, title, description,
      status, priority, assigned_to, due_date
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [
      task.organizationId,
      task.caseId,
      task.title,
      task.description,
      task.status || 'open',
      task.priority || 'medium',
      task.assignedTo,
      task.dueDate,
    ]
  )
  return result.rows[0]
}

// ============================================================================
// NOTES
// ============================================================================

export async function getNotesByCase(caseId: string): Promise<Note[]> {
  const result = await pool.query(
    `SELECT * FROM notes_new WHERE case_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC`,
    [caseId]
  )
  return result.rows
}

export async function createNote(note: any): Promise<Note> {
  const result = await pool.query(
    `INSERT INTO notes_new (
      organization_id, case_id, user_id, content,
      note_type, is_restricted
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      note.organizationId,
      note.caseId,
      note.userId,
      note.content,
      note.noteType || 'general',
      note.isRestricted || false,
    ]
  )
  return result.rows[0]
}

// ============================================================================
// OUTREACH ACTIVITIES
// ============================================================================

export async function getOutreachActivities(organizationId: string): Promise<OutreachActivity[]> {
  const result = await pool.query(
    `SELECT * FROM outreach_activities_new WHERE organization_id = $1 AND deleted_at IS NULL ORDER BY contact_date DESC`,
    [organizationId]
  )
  return result.rows
}

export async function getActivitiesByCase(caseId: string): Promise<OutreachActivity[]> {
  const result = await pool.query(
    `SELECT * FROM outreach_activities_new WHERE case_id = $1 AND deleted_at IS NULL ORDER BY contact_date DESC`,
    [caseId]
  )
  return result.rows
}

export async function createOutreachActivity(activity: any): Promise<OutreachActivity> {
  const result = await pool.query(
    `INSERT INTO outreach_activities_new (
      organization_id, case_id, provider_id, user_id,
      activity_type, description, result, contact_date, next_steps
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`,
    [
      activity.organizationId,
      activity.caseId,
      activity.providerId,
      activity.userId,
      activity.activityType,
      activity.description,
      activity.result,
      activity.contactDate,
      activity.nextSteps,
    ]
  )
  return result.rows[0]
}

// ============================================================================
// AUDIT LOGGING
// ============================================================================

export async function logActivity(log: any): Promise<void> {
  await pool.query(
    `INSERT INTO activity_logs (
      organization_id, user_id, entity_type, entity_id,
      action, changes, metadata
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      log.organizationId,
      log.userId,
      log.entityType,
      log.entityId,
      log.action,
      JSON.stringify(log.changes || {}),
      JSON.stringify(log.metadata || {}),
    ]
  )
}

