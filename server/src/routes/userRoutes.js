import express from "express"
import { userSchema, validateBody } from "../middleware/validate.js"
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", validateBody(userSchema), createUser)
router.put("/:id", validateBody(userSchema), updateUser)
router.delete("/:id", deleteUser)

export default router
