const Room = require('../models/Room')

// Create Room
const room_create = async (req, res) => {
    try {
        const { roomId } = req.body

        // check if room with entered id already exists
        const checkRoom = await Room.findOne({ roomId })
        if (checkRoom)
            return res.status(400).json({
                message:
                    'room with entered ID already exists. Try again with another ID.',
            })

        const room = new Room({
            roomId,
            roomJoinable: true,
            roomRound: 0,
            users: [],
            game: false,
        })

        const savedRoom = await room.save()
        if (!savedRoom) return res.status(400).json({ message: 'err' })
        res.status(200).json(savedRoom)
    } catch (err) {
        console.log(err)
    }
}

// Read Room
const room_read = async (req, res) => {
    try {
        const { _id } = req.params
        const room = await Room.findById({ _id })
        if (!room) return res.status(400).json({ message: 'err' })
        res.status(200).json(room)
    } catch (err) {
        console.log(err)
    }
}

const room_user_join = async (req, res) => {
    try {
        const { room_id, user_id } = req.body

        const roomCurr = await Room.findById({ _id: room_id })
        if (!roomCurr) return res.status(403).json({ message: 'no room found' })

        let userExists = false
        roomCurr.users.forEach((data) => {
            if (data?.nickname === nickname) {
                return (userExists = true)
            }
        })

        if (!userExists) {
            roomCurr.gameData = [...roomCurr?.gameData, userGameDataObject]
            roomCurr.gamePoints = [
                ...roomCurr?.gamePoints,
                userGamePointsObject,
            ]

            await roomCurr.save()
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    room_create,
    room_read,
    room_user_join,
}
