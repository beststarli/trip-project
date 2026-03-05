import pool from '../db/pool'

export type UserProfile = {
    id: number
    account: string
    created_at: string
}

export async function getUserById(id: number): Promise<UserProfile | null> {
    const result = await pool.query('SELECT id, account, created_at FROM users WHERE id = $1', [id])
    return (result.rows[0] as UserProfile | undefined) ?? null
}

export async function listUsers(limit = 20, offset = 0): Promise<UserProfile[]> {
    const safeLimit = Math.max(1, Math.min(limit, 100))
    const safeOffset = Math.max(0, offset)

    const result = await pool.query(
        'SELECT id, account, created_at FROM users ORDER BY id DESC LIMIT $1 OFFSET $2',
        [safeLimit, safeOffset],
    )

    return result.rows as UserProfile[]
}
