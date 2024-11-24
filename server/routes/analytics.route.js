import express from 'express'
import { isAdmin, protectedRoute } from '../middleware/auth.middleware.js'
import { getAnalytics } from '../controller/analytics.controller.js'

const router = express.Router()
router.get('/' , protectedRoute , isAdmin , getAnalytics)

export default router