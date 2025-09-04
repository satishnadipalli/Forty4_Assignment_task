// controllers/userController.js
import User from "../models/User.js"

// GET all users
export const getUsers = async (_req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json(users)
  } catch (e) {
    next(e)
  }
}

// GET single user by id
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: true, message: "User not found" })
    res.json(user)
  } catch (e) {
    next(e)
  }
}

// CREATE user
export const createUser = async (req, res, next) => {
  try {
    const created = await User.create(req.body)
    res.status(201).json(created)
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ error: true, message: "Email already exists" })
    }
    next(e)
  }
}

// UPDATE user
export const updateUser = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ error: true, message: "User not found" })
    res.json(updated)
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ error: true, message: "Email already exists" })
    }
    next(e)
  }
}

// DELETE user
export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: true, message: "User not found" })
    res.json({ success: true })
  } catch (e) {
    next(e)
  }
}
