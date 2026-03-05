import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('Missing DATABASE_URL in environment variables')
}

const pool = new Pool({
  connectionString,
})

export default pool
