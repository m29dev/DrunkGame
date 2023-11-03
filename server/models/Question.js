const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
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

const Question = mongoose.model('Question', questionSchema)
module.exports = Question
