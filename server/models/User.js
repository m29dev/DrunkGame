const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userGameData: {
        type: Array,
        required: true,
    },
})

const User = mongoose.model('User', userSchema)
module.exports = User
