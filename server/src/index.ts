import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import initDatabase from './db/init'
import { swaggerSpec } from './docs/swagger'

const app = express()
const port = Number(process.env.PORT || 4000)

app.use(cors())
app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/docs.json', (_req: Request, res: Response) => {
    res.json(swaggerSpec)
})

app.use('/user', userRoutes)
app.use('/auth', authRoutes)

app.get('/', (_req: Request, res: Response) => {
    res.json({
        success: true,
        message: '欢迎来到酒店预订系统 API'
    })
})

app.get('/health', (_req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'ok'
    })
})


app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err)
    res.status(500).json({
        success: false,
        message: '服务器内部错误'
    })
})

async function bootstrap() {
    await initDatabase()

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
}

bootstrap().catch((error) => {
    console.error('Failed to start server:', error)
    process.exit(1)
})
