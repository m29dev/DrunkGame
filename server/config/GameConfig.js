const Room = require('../models/Room')
const User = require('../models/User')
const Qna = require('../models/Qna')
const Question = require('../models/Question')
const Challenge = require('../models/Challenge')
const MostLikelyTo = require('../models/MostLikelyTo')

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

                    const room_id = JSON.stringify(room._id).slice(1, -1)
                    // socket.nsp.to(roomId).emit('roomUserToggle', roomUpdate)
                    socket.nsp
                        .to(room_id)
                        .emit('clientRoomInfoUpdate', roomUpdate)
                    console.log('user disconnected: ', socket.userId, room_id)

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
                // socket.nsp.to(room_id).emit('roomUserToggle', roomUpdate)
                socket.nsp.to(room_id).emit('clientRoomInfoUpdate', roomUpdate)

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
                // socket.nsp.to(room_id).emit('roomUserToggle', roomUpdate)
                socket.nsp.to(room_id).emit('clientRoomInfoUpdate', roomUpdate)

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
                    // socket.nsp.to(room_id).emit('roomUserToggle', roomUpdate)
                    socket.nsp
                        .to(room_id)
                        .emit('clientRoomInfoUpdate', roomUpdate)

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
        // console.log('1. Active Users Length: ', activeUsersLength)

        let currentRound
        if (room.roomRound < activeUsersLength) {
            currentRound = room.roomRound + 1
        } else {
            currentRound = 1
        }
        // console.log('2. Current Round: ', currentRound)

        const currentUser = activeUsers[currentRound - 1]
        if (!currentUser) return console.log('err')
        room.gameCurrentUser = [currentUser]
        // console.log('3. Current User: ', room.gameCurrentUser)

        const roomUpdated = await Room.findByIdAndUpdate(
            { _id: room_id },
            {
                roomRound: currentRound,
                gameCurrentUser: room.gameCurrentUser,
                gameCurrentDice: null,
                gameCurrentAssignment: [],
                gameCurrentAnswer: null,
                gameCurrentCategory: null,
            },
            { new: true }
        )

        // socket.nsp.to(room_id).emit('clientCurrentUserRound', roomUpdated)
        socket.nsp.to(room_id).emit('clientRoomInfoUpdate', roomUpdated)
    } catch (err) {
        console.log(err)
    }
}

const gameRollTheDice = async (room_id, socket) => {
    try {
        const room = await Room.findById({ _id: room_id })

        const randomNum = Math.trunc(Math.random() * 6 + 1)
        if (!randomNum) return console.log('random_num err')
        room.gameCurrentDice = randomNum

        const roomUpdate = await Room.findByIdAndUpdate(
            { _id: room_id },
            { gameCurrentDice: room.gameCurrentDice },
            { new: true }
        )

        socket.nsp.to(room_id).emit('clientRoomInfoUpdate', roomUpdate)
    } catch (err) {
        console.log(err)
    }
}

const gameGetCategoryAssignment = async (room_id, socket) => {
    try {
        const room = await Room.findById({ _id: room_id })
        let roomUpdate

        // randomize category (1. Qna, 2. Challenge, 3. MostLikelyTo)
        const categoryNum = Math.trunc(Math.random() * 3 + 1)
        console.log(279, categoryNum)

        // Qna Category
        if (categoryNum === 1) {
            const qnaAll = await Qna.find({})
            const randomNum = Math.trunc(Math.random() * qnaAll.length)
            const qnaRes = qnaAll[randomNum]
            if (!qnaRes) return console.log('qna err')

            room.gameCurrentAssignment = [qnaRes]
            roomUpdate = await Room.findByIdAndUpdate(
                { _id: room_id },
                {
                    gameCurrentCategory: 'qna',
                    gameCurrentAssignment: room.gameCurrentAssignment,
                },
                { new: true }
            )
        }

        // Challenge Category
        if (categoryNum === 2) {
            const challengeAll = await Challenge.find({})
            const randomNum = Math.trunc(Math.random() * challengeAll.length)
            const challengeRes = challengeAll[randomNum]
            if (!challengeRes) return console.log('challenge err')

            console.log(2, challengeRes)
            // room.gameCurrentAssignment.push(challengeRes)
            room.gameCurrentAssignment = [challengeRes]
            roomUpdate = await Room.findByIdAndUpdate(
                { _id: room_id },
                {
                    gameCurrentCategory: 'challenge',
                    gameCurrentAssignment: room.gameCurrentAssignment,
                },
                { new: true }
            )
        }

        // MostLikelyTo Category
        if (categoryNum === 3) {
            const mostLikelyToAll = await MostLikelyTo.find({})
            const randomNum = Math.trunc(Math.random() * mostLikelyToAll.length)
            const mostLikelyToRes = mostLikelyToAll[randomNum]
            if (!mostLikelyToRes) return console.log('mostLikelyTo err')

            room.gameCurrentAssignment = [mostLikelyToRes]

            room.gameCurrentAssignment.push({
                usersToVote: [...room.users],
            })

            room.gameCurrentAssignment.push({
                votes: [], // user_id as a vote
            })

            roomUpdate = await Room.findByIdAndUpdate(
                { _id: room_id },
                {
                    gameCurrentCategory: 'mostLikelyTo',
                    gameCurrentAssignment: room.gameCurrentAssignment,
                },
                { new: true }
            )
        }

        if (!roomUpdate) return console.log('roomUpdate err')
        socket.nsp.to(room_id).emit('clientRoomInfoUpdate', roomUpdate)
    } catch (err) {
        console.log(err)
    }
}

const gameAssignmentAnswer = async (room_id, answer, socket) => {
    try {
        const room = await Room.findById({ _id: room_id })
        const user = await User.findById({ _id: socket.user_id })

        const category = room.gameCurrentCategory

        if (category === 'qna') {
            room.gameCurrentAnswer = answer
            const roomUpdate = await Room.findByIdAndUpdate(
                { _id: room_id },
                { gameCurrentAnswer: room.gameCurrentAnswer },
                { new: true }
            )
            socket.nsp.to(room_id).emit('clientRoomInfoUpdate', roomUpdate)
        }

        if (category === 'challenge') {
            room.gameCurrentAnswer = answer
            const roomUpdate = await Room.findByIdAndUpdate(
                { _id: room_id },
                { gameCurrentAnswer: room.gameCurrentAnswer },
                { new: true }
            )
            socket.nsp.to(room_id).emit('clientRoomInfoUpdate', roomUpdate)
        }

        if (category === 'mostLikelyTo') {
            const userSelected = answer
            const voter = socket.user_id

            const voteObject = {
                userSelected,
                voter,
            }

            if (!userSelected || !voter || !voteObject)
                return console.log('answer mostLikelyTo err')

            room.gameCurrentAssignment[2].votes.push(voteObject)

            if (
                room.gameCurrentAssignment[2].votes.length === room.users.length
            ) {
                console.log('All votes sent. Winner is...')

                // calculate  winner
                const usersVotesArr = []

                room.gameCurrentAssignment[1].usersToVote.forEach((user) => {
                    // for EACH USER to vote
                    const userObject = {
                        user_id: user._id,
                        userId: user.userId,
                        userVotes: 0,
                    }

                    room.gameCurrentAssignment[2].votes.forEach((vote) => {
                        if (vote.userSelected === user._id) {
                            userObject.userVotes += 1
                        }
                    })

                    usersVotesArr.push(userObject)
                })

                let biggestVotesNumber = 0
                let winnerUserId
                usersVotesArr.forEach((user) => {
                    if (user.userVotes > biggestVotesNumber) {
                        biggestVotesNumber = user.userVotes
                        winnerUserId = user.user_id
                    }
                })

                console.log(winnerUserId)
                room.gameCurrentAnswer = winnerUserId
            }

            const roomUpdate = await Room.findByIdAndUpdate(
                { _id: room_id },
                {
                    gameCurrentAssignment: room.gameCurrentAssignment,
                    gameCurrentAnswer: room.gameCurrentAnswer,
                },
                { new: true }
            )

            socket.nsp.to(room_id).emit('clientRoomInfoUpdate', roomUpdate)
        }

        // check if currentAnswer is correct
        // if (answer === room?.gameCurrentAssignment?.[0]?.correctAnswer) {
        //     console.log('correct')
        //     user.points = user.points + room?.gameCurrentDice
        //     const userUpdate = await User.findByIdAndUpdate(
        //         { _id: socket.user_id },
        //         { points: user.points },
        //         { new: true }
        //     )

        //     console.log(19, socket.id)
        //     socket.to(socket.id).emit('userInfoTest', { userInfoTest: 'test' })

        //     // socket.to(socket.id).emit('clientUserInfoUpdate', userUpdate)
        // } else {
        //     console.log('incorrect')
        // }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    clientDisconnect,
    roomUserJoin,
    gameUserReady,
    gameNextPlayerRound,
    gameRollTheDice,
    gameGetCategoryAssignment,
    gameAssignmentAnswer,
}
