import mongoose from 'mongoose'

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI not set')
  await mongoose.connect(uri, { dbName: uri.split('/').pop() })
  mongoose.connection.on('connected', () => console.log('MongoDB connected'))
  mongoose.connection.on('error', (err) => console.error('MongoDB error:', err))
}
