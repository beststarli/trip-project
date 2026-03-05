import fs from 'fs'
import path from 'path'
import pool from './pool'

async function initDatabase() {
  const sqlPath = path.join(__dirname, 'init.sql')
  const sql = fs.readFileSync(sqlPath, 'utf8')
  await pool.query(sql)
}

export default initDatabase
