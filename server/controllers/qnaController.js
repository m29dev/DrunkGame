const Qna = require('../models/Qna')

// Read Random Qna
const qna_get = async (req, res) => {
    try {
        const qnaAll = await Qna.find({})
        const randomNum = Math.trunc(Math.random() * (qnaAll.length + 1))
        const qnaRes = qnaAll[randomNum]
        if (!qnaRes) return res.status(403).json({ message: 'qna err' })

        res.status(200).json(qnaRes)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    qna_get,
}
