const express = require('express')
const controller = require('../controllers/qnaController.js')

const router = express.Router()

router.get('/api/qna', controller.qna_get)

module.exports = router
