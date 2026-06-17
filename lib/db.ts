import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const pool = new Pool({
  connectionString,
})

pool.on('error', (err) => {
  console.error('[v0] Unexpected pool error:', err)
})

export async function query(text: string, params?: any[]) {
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
  return pool.connect()
}
