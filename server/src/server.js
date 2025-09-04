import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'User Management API' })
})

app.use('/api/users', userRoutes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, _req, res, _next) => {
  const status = err.status || 500
  res.status(status).json({
    error: true,
    message: err.message || 'Server Error'
  })
})

const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}).catch((e) => {
  console.error('Failed to connect DB', e)
  process.exit(1)
})
