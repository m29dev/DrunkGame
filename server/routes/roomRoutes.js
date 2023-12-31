const express = require('express')
const controller = require('../controllers/roomController.js')

const router = express.Router()

router.post('/api/rooms/create', controller.room_create)
router.get('/api/rooms/read/:_id', controller.room_read)
router.get('/api/rooms/user/join/:roomId', controller.room_user_join)

router.get('/add/database', controller.add_database)

module.exports = router
