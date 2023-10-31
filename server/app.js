const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const roomRoutes = require('./routes/roomRoutes')
const qnaRoutes = require('./routes/qnaRoutes')
const http = require('http')
const dbConnect = require('./config/DatabaseConfig')
const Room = require('./models/Room')
const {
    roomUserJoin,
    clientDisconnect,
    gameUserReady,
    gameNextPlayerRound,
} = require('./config/GameConfig')

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = http.createServer(app)

const io = require('socket.io')(server, {
    allowEIO3: true,
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
})
io.use((socket, next) => {
    const userId = socket.handshake.auth.userId
    const user_id = socket.handshake.auth.user_id
    if (!userId) {
        return next(new Error('invalid userId'))
    }
    if (!user_id) {
        return next(new Error('invalid user_id'))
    }
    socket.userId = userId
    socket.user_id = user_id
    next()
})
io.on('connection', async (socket) => {
    try {
        // socket.userId    =>  User Nickname
        // socket.user_id   =>  User MongoDB ID

        // connection event
        console.log('user connected: ', socket.userId, socket.id)

        // ROOM EVENTS
        // on room join
        socket.on('roomJoin', async ({ room_id }) => {
            roomUserJoin(room_id, socket.user_id, socket)
        })

        // GAME EVENTS
        // on ready
        socket.on('gameUserReady', async ({ room_id, ready }) => {
            gameUserReady(room_id, ready, socket)
        })

        // on next player round
        socket.on('gameNextPlayerRound', async ({ room_id }) => {
            // advance round
            gameNextPlayerRound(room_id, socket)
        })

        // on end game
        socket.on('gameEnd', async ({ roomId }) => {
            const res = await Room.findOne({ roomId })
            socket.nsp.to(roomId).emit('endGameRoom', res)
        })

        // on game restart
        socket.on('gameRestart', async ({ roomId }) => {
            const room = await Room.findOne({ roomId })
            if (!room) return console.log('no room found')

            const roomRestart = await Room.findByIdAndUpdate(
                { _id: room._id },
                {
                    roomJoinable: true,
                    roundNumber: 0,
                    roundReviews: [],
                    gameData: [],
                },
                { new: true }
            )

            socket.nsp.to(roomId).emit('restartGameRoom', roomRestart)
        })

        // disconnection event
        socket.on('disconnect', () => {
            // move this ferature to another socket event (onLeaveRoom)
            clientDisconnect(socket)
        })
    } catch (err) {
        console.log(err)
    }
})

server.listen(3000, () => {
    console.log('server works')
})
dbConnect()

//routes
app.use(authRoutes)
app.use(roomRoutes)
app.use(qnaRoutes)
