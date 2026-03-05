import bcrypt from 'bcryptjs'
import jwt, { SignOptions } from 'jsonwebtoken'
import pool from '../db/pool'

export class AuthServiceError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.name = 'AuthServiceError'
        this.statusCode = statusCode
    }
}

export type SafeUser = {
    id: number
    account: string
    created_at: string
}

export function validateCredentials(account: string, password: string, confirmPassword: string): string | null {
    if (!account || !password || !confirmPassword) {
        return '手机号和密码不能为空'
    }

    if (password !== confirmPassword) {
        return '两次输入的密码不一致'
    }

    if (String(account).trim().length !== 11) {
        return '输入手机号有误'
    }

    if (String(password).length < 8) {
        return '密码长度至少 8 位'
    }

    return null
}

export async function registerUser(account: string, password: string): Promise<SafeUser> {
    const normalizedAccount = String(account).trim()

    const existingUserResult = await pool.query('SELECT id FROM users WHERE account = $1', [normalizedAccount])
    if ((existingUserResult.rowCount ?? 0) > 0) {
        throw new AuthServiceError('该账号已存在', 409)
    }

    const passwordHash = await bcrypt.hash(String(password), 10)

    const insertResult = await pool.query(
        'INSERT INTO users (account, password_hash) VALUES ($1, $2) RETURNING id, account, created_at',
        [normalizedAccount, passwordHash],
    )

    return insertResult.rows[0] as SafeUser
}

export async function loginUser(account: string, password: string): Promise<{ token: string; user: SafeUser }> {
    const normalizedAccount = String(account).trim()

    const userResult = await pool.query('SELECT id, account, password_hash, created_at FROM users WHERE account = $1', [
        normalizedAccount,
    ])

    if ((userResult.rowCount ?? 0) === 0) {
        throw new AuthServiceError('账号或密码错误', 401)
    }

    const user = userResult.rows[0] as {
        id: number
        account: string
        password_hash: string
        created_at: string
    }

    const isPasswordValid = await bcrypt.compare(String(password), user.password_hash)
    if (!isPasswordValid) {
        throw new AuthServiceError('账号或密码错误', 401)
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        throw new AuthServiceError('服务端 JWT 配置缺失', 500)
    }

    const signOptions: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
    }

    const token = jwt.sign(
        {
            sub: user.id,
            account: user.account,
        },
        jwtSecret,
        signOptions,
    )

    return {
        token,
        user: {
            id: user.id,
            account: user.account,
            created_at: user.created_at,
        },
    }
}

export async function getAuthUserProfile(userId: number): Promise<SafeUser | null> {
    const result = await pool.query('SELECT id, account, created_at FROM users WHERE id = $1', [userId])
    return (result.rows[0] as SafeUser | undefined) ?? null
}