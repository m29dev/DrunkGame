const mongoose = require('mongoose')

const qnaSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: Array,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
})

const Qna = mongoose.model('Qna', qnaSchema)
module.exports = Qna
