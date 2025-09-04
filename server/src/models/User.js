import mongoose from 'mongoose'

const GeoSchema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number }
}, { _id: false })

const AddressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  zip: { type: String },
  geo: { type: GeoSchema, default: {} }
}, { _id: false })

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String },
  company: { type: String },
  address: { type: AddressSchema, default: {} }
}, { timestamps: true })

UserSchema.index({ email: 1 }, { unique: true })

export default mongoose.model('User', UserSchema)
