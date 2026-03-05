import { NextFunction, Request, Response, Router } from 'express'
import { AuthServiceError, loginUser, registerUser, validateCredentials } from '../services/auth.service'

const router = Router()

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: 用户注册
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       201:
 *         description: 注册成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 注册成功
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: 参数错误
 *       409:
 *         description: 账号已存在
 */

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { account, password, confirmPassword } = req.body || {}
        const validationError = validateCredentials(account, password, confirmPassword)

        if (validationError) {
            return res.status(400).json({ message: validationError })
        }
        const user = await registerUser(String(account), String(password))

        return res.status(201).json({
            success: true,
            message: '注册成功',
            user,
        })
    } catch (error) {
        if (error instanceof AuthServiceError) {
            return res.status(error.statusCode).json({ message: error.message })
        }
        return next(error)
    }
})

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: 用户登录
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: 登录成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 登录成功
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: 参数错误
 *       401:
 *         description: 账号或密码错误
 */

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { account, password } = req.body || {}

        if (!account || !password) {
            return res.status(400).json({ message: '账号和密码不能为空' })
        }
        const { token, user } = await loginUser(String(account), String(password))

        return res.json({
            success: true,
            message: '登录成功',
            token,
            user,
        })
    } catch (error) {
        if (error instanceof AuthServiceError) {
            return res.status(error.statusCode).json({ message: error.message })
        }
        return next(error)
    }
})

export default router
