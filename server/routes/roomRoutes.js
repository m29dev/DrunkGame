const express = require('express')
const controller = require('../controllers/roomController.js')

const router = express.Router()

router.post('/api/rooms/create', controller.room_create)
router.get('/api/rooms/read/:_id', controller.room_read)
// router.post('/api/rooms/user/join', controller.room_user_join)

module.exports = router
