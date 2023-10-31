const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
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
    game: {
        type: Boolean,
        required: true,
    },
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room
