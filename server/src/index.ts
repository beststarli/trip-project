import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import initDatabase from './db/init'

const app = express()
const port = Number(process.env.PORT || 4000)

app.use(cors())
app.use(express.json())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ message: 'ok' })
})

app.use('/api/auth', authRoutes)

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).json({ message: '服务器内部错误' })
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
