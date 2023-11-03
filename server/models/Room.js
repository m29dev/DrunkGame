const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    // room config
    roomId: {
        type: String,
        required: true,
    },
    roomJoinable: {
        type: Boolean,
        required: true,
    },
    roomRound: {
        type: Number,
        required: true,
    },
    users: {
        type: Array,
        required: true,
    },

    // game config
    game: {
        type: Boolean,
        required: true,
    },
    gameCurrentUser: {
        type: Array,
        required: true,
    },
    gameCurrentDice: {
        type: Number, // 1-6 dice num
    },
    gameCurrentCategory: {
        type: String,
    },
    gameCurrentAssignment: {
        type: Array, // [{assignment object}]
        required: true,
    },
    gameCurrentAnswer: {
        type: String, // A, B, C, D
    },
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room
