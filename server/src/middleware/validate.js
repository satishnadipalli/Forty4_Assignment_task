import { z } from 'zod'

const geoSchema = z.object({
  lat: z.number().optional(),
  lng: z.number().optional()
}).partial()

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  geo: geoSchema.optional()
}).partial()

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  address: addressSchema.optional()
})

export const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body)
    next()
  } catch (err) {
    res.status(400).json({ error: true, message: err.errors?.[0]?.message || 'Invalid data' })
  }
}
