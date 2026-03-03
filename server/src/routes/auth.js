const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db/pool')

const router = express.Router()

function validateCredentials(account, password) {
  if (!account || !password) {
    return '账号和密码不能为空'
  }

  if (String(account).trim().length < 4) {
    return '账号长度至少 4 位'
  }

  if (String(password).length < 6) {
    return '密码长度至少 6 位'
  }

  return null
}

router.post('/register', async (req, res, next) => {
  try {
    const { account, password } = req.body || {}
    const validationError = validateCredentials(account, password)

    if (validationError) {
      return res.status(400).json({ message: validationError })
    }

    const normalizedAccount = String(account).trim()

    const existingUserResult = await pool.query('SELECT id FROM users WHERE account = $1', [normalizedAccount])
    if (existingUserResult.rowCount > 0) {
      return res.status(409).json({ message: '账号已存在' })
    }

    const passwordHash = await bcrypt.hash(String(password), 10)

    const insertResult = await pool.query(
      'INSERT INTO users (account, password_hash) VALUES ($1, $2) RETURNING id, account, created_at',
      [normalizedAccount, passwordHash]
    )

    return res.status(201).json({
      message: '注册成功',
      user: insertResult.rows[0]
    })
  } catch (error) {
    return next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { account, password } = req.body || {}

    if (!account || !password) {
      return res.status(400).json({ message: '账号和密码不能为空' })
    }

    const normalizedAccount = String(account).trim()

    const userResult = await pool.query(
      'SELECT id, account, password_hash, created_at FROM users WHERE account = $1',
      [normalizedAccount]
    )

    if (userResult.rowCount === 0) {
      return res.status(401).json({ message: '账号或密码错误' })
    }

    const user = userResult.rows[0]
    const isPasswordValid = await bcrypt.compare(String(password), user.password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({ message: '账号或密码错误' })
    }

    const token = jwt.sign(
      {
        sub: user.id,
        account: user.account
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    )

    return res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        account: user.account,
        created_at: user.created_at
      }
    })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
