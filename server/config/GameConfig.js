const Room = require('../models/Room')

const clientDisconnect = async (socket) => {
    try {
        const rooms = await Room.find({})
        rooms.forEach((room) => {
            room.users.forEach(async (user) => {
                if (user._id === socket.user_id) {
                    console.log('is user')

                    user.active = false
                    const roomUpdate = await Room.findByIdAndUpdate(
                        { _id: room._id },
                        { users: room.users },
                        { new: true }
                    )

                    const roomId = JSON.stringify(room._id).slice(1, -1)
                    socket.nsp.to(roomId).emit('roomUserToggle', roomUpdate)
                    console.log('user disconnected: ', socket.userId, roomId)

                    return
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
}

const roomUserJoin = async (room_id, user_id, socket) => {
    try {
        const room = await Room.findById({ _id: room_id })
        if (!room)
            return (
                console.log('no room found'),
                socket.emit('roomJoinData', {
                    error: 'no room found',
                })
            )

        if (room?.roomJoinable) {
            // join socket client to the room
            socket.join(room_id)

            // check if user nickname is already in tha clients array
            let isClient = false
            room?.users?.forEach((user) => {
                if (user?.userId === socket.userId)
                    return (isClient = true), (user.active = true)
            })

            const userObject = {
                _id: user_id,
                userId: socket.userId,
                active: true,
                ready: false,
            }

            // add user nickname to the database clients array
            if (!isClient) {
                room.users.push(userObject)
                const roomUpdate = await Room.findByIdAndUpdate(
                    { _id: room_id },
                    { users: room.users },
                    { new: true }
                )

                // socket.emit('roomJoinData', {
                //     room,
                //     message: `${socket.userId} joined the room`,
                // })
                socket.nsp.to(room_id).emit('roomUserToggle', roomUpdate)

                console.log(
                    `${socket.userId} ${socket.id}'s joined Room ${room_id}`
                )
            }

            if (isClient) {
                const roomUpdate = await Room.findByIdAndUpdate(
                    { _id: room_id },
                    { users: room.users },
                    { new: true }
                )

                // socket.emit('roomJoinData', {
                //     room,
                //     message: `${socket.userId}'s rejoined the room`,
                // })
                socket.nsp.to(room_id).emit('roomUserToggle', roomUpdate)

                console.log(
                    `${socket.userId} ${socket.id}'s rejoined Room ${room_id}`
                )
            }
        }

        if (!room?.roomJoinable) {
            // check if user client was in the game
            let isClient = false
            room.users.forEach(async (user) => {
                if (user.userId === socket.userId) {
                    user.active = true
                    socket.join(room_id)
                    isClient = true

                    const roomUpdate = await Room.findByIdAndUpdate(
                        { _id: room_id },
                        { users: room.users },
                        { new: true }
                    )

                    // socket.emit('roomJoinData', {
                    //     room,
                    //     message: `${socket.userId}'s rejoined the room`,
                    // })
                    socket.nsp.to(room_id).emit('roomUserToggle', roomUpdate)

                    console.log(
                        `${socket.userId} ${socket.id}'s rejoined Room ${room_id}`
                    )
                }
            })

            if (!isClient) {
                socket.emit('roomJoinData', {
                    error: 'cannot join the room, game has already started',
                })
                console.log('cannot join the room, game has aleady started')
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const gameUserReady = async (room_id, ready, socket) => {
    try {
        const room = await Room.findById({ _id: room_id })
        room?.users?.forEach(async (user) => {
            if (user._id === socket.user_id) {
                return (user.ready = ready)
            }
        })

        let roomUpdate = await Room.findByIdAndUpdate(
            { _id: room_id },
            { users: room.users },
            { new: true }
        )

        // check if all ACTIVE USERS are READY
        let activeUsers = []
        roomUpdate.users.forEach((user) => {
            if (user.active) {
                activeUsers.push(user._id)
            }
        })
        let readyUsers = []
        roomUpdate.users.forEach((user) => {
            if (user.ready) {
                readyUsers.push(user._id)
            }
        })

        // if all READY start The Game
        if (activeUsers.length === readyUsers.length) {
            roomUpdate = await Room.findByIdAndUpdate(
                { _id: room_id },
                { game: true },
                { new: true }
            )
        }

        if (roomUpdate.game) {
            socket.nsp.to(room_id).emit('gameStart', { gameStart: 'gameStart' })

            // clear users Ready status
            roomUpdate.users.forEach((user) => {
                user.ready = false
            })
            await Room.findByIdAndUpdate(
                { _id: room_id },
                { users: roomUpdate.users },
                { new: true }
            )
        }
    } catch (err) {
        console.log(err)
    }
}

const gameNextPlayerRound = async (room_id, socket) => {
    try {
        const room = await Room.findById({ _id: room_id })

        const activeUsers = []
        room.users.forEach((user) => {
            if (user.active) {
                activeUsers.push(user)
            }
        })
        const activeUsersLength = activeUsers.length
        console.log('1. Active Users Length: ', activeUsersLength)

        let currentRound
        if (room.roomRound < activeUsersLength) {
            currentRound = room.roomRound + 1
        } else {
            currentRound = 1
        }
        console.log('2. Current Round: ', currentRound)

        const currentUser = activeUsers[currentRound - 1]
        if (!currentUser) return console.log('err')
        room.gameCurrentUser = [currentUser]
        console.log('3. Current User: ', room.gameCurrentUser)

        const roomUpdated = await Room.findByIdAndUpdate(
            { _id: room_id },
            { roomRound: currentRound, gameCurrentUser: room.gameCurrentUser },
            { new: true }
        )

        socket.nsp.to(room_id).emit('clientCurrentUserRound', roomUpdated)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    clientDisconnect,
    roomUserJoin,
    gameUserReady,
    gameNextPlayerRound,
}
