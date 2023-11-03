const mongoose = require('mongoose')

const mostLikelyToSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
})

const MostLikelyTo = mongoose.model('MostLikelyTo', mostLikelyToSchema)
module.exports = MostLikelyTo
