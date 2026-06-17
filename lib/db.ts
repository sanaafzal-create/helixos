import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

// Only create pool if DATABASE_URL is set (allows build without database)
export const pool = connectionString ? new Pool({
  connectionString,
}) : null

if (pool) {
  pool.on('error', (err) => {
    console.error('[v0] Unexpected pool error:', err)
  })
}

export async function query(text: string, params?: any[]) {
  if (!pool) {
    throw new Error('Database connection not available')
  }
  const start = Date.now()
  try {
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('[v0] Executed query:', { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error('[v0] Database query error:', error)
    throw error
  }
}

export async function getConnection() {
  if (!pool) {
    throw new Error('Database connection not available')
  }
  return pool.connect()
}
