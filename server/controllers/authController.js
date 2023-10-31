require('dotenv').config()
const User = require('../models/User')

// Create User
const user_connect = async (req, res) => {
    try {
        const { userId } = req.params
        const user = new User({
            userId,
            userGameData: [],
        })
        const userCreated = await user.save()

        if (!userCreated)
            return res.status(403).json({ message: 'cannot create user' })
        res.status(200).json(userCreated)
    } catch (err) {
        console.log(err)
    }
}

// Read User
const user_get = async (req, res) => {
    try {
        const { _id } = req.params
        const user = await User.findById({ _id })
        if (!user) return res.status(403).json({ message: 'cannot get user' })
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    user_connect,
    user_get,
}
