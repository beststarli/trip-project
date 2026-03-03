require('dotenv').config()

const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const initDatabase = require('./db/init')

const app = express()
const port = Number(process.env.PORT || 4000)

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ message: 'ok' })
})

app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
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
