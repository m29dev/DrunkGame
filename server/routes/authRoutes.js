const express = require('express')
const controller = require('../controllers/authController.js')

const router = express.Router()

router.get('/api/auth/connect/:userId', controller.user_connect)
router.get('/api/auth/read/:_id', controller.user_get)

module.exports = router
