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
            gameCurrentUser: [],
            gameCurrentDice: null,
            gameCurrentCategory: '',
            gameCurrentAssignment: [],
            gameCurrentAnswer: null,
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
        const { roomId } = req.params

        const room = await Room.findOne({ roomId })
        if (!room) return res.status(403).json({ message: 'no room found' })

        res.status(200).json({ room_id: room._id })
    } catch (err) {
        console.log(err)
    }
}

const Qna = require('../models/Qna')
const Question = require('../models/Question')
const Challenge = require('../models/Challenge')
const MostLikelyTo = require('../models/MostLikelyTo')
const add_database = async (req, res) => {
    try {
        const dataArray = [
            {
                question:
                    'Kto najprawdopodobniej weźmie udział w reality show?',
            },
            {
                question: 'Kto najprawdopodobniej spóźni się na spotkanie?',
            },
            {
                question:
                    'Kto najprawdopodobniej zapomni o urodzinach swojego najlepszego przyjaciela?',
            },
            {
                question: 'Kto najprawdopodobniej zostanie prezydentem?',
            },
            {
                question: 'Kto najprawdopodobniej wygra konkurs talentów?',
            },
            {
                question:
                    'Kto najprawdopodobniej wybuchnie śmiechem na nieodpowiednim miejscu?',
            },
            {
                question:
                    'Kto najprawdopodobniej będzie podróżować po całym świecie?',
            },
            {
                question: 'Kto najprawdopodobniej zostanie milionerem?',
            },
            {
                question:
                    'Kto najprawdopodobniej poderwie kogoś będąc na randce z kimś innym?',
            },
            {
                question:
                    'Kto najprawdopodobniej będzie niemiły w stosunku do klientów podczas pracy?',
            },
            {
                question:
                    'Kto najprawdopodobniej będzie się spotykać z kimś dla pieniędzy?',
            },
            {
                question:
                    'Kto najprawdopodobniej będzie pierwszym, który się ożeni?',
            },
            {
                question:
                    'Kto najprawdopodobniej będzie mieć sponsora lub sponsorkę?',
            },
        ]

        dataArray.forEach((item) => {
            const newMLT = new MostLikelyTo({
                question: item.question,
            })

            newMLT.save()
        })

        res.json({ message: 'add_database' })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    room_create,
    room_read,
    room_user_join,

    add_database,
}
