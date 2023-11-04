import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import TextGradient from '../textGradient/TextGradient'

const QnaCategory = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()

    const abcd = ['A', 'B', 'C', 'D']

    const handleUserAnswer = (index) => {
        socket.emit('gameAssignmentAnswer', {
            room_id: roomInfo?._id,
            answer: abcd[index],
        })

        if (
            roomInfo?.gameCurrentAssignment?.[0]?.correctAnswer === abcd[index]
        ) {
            console.log('Correct Answer!')
        }
    }

    return (
        <>
            <TextGradient text={`Quizz`} size={45}></TextGradient>

            <div>
                {roomInfo?.gameCurrentAssignment?.[0] &&
                    authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                        <div>
                            <h4>
                                {roomInfo?.gameCurrentAssignment?.[0]?.question}
                            </h4>
                            {roomInfo?.gameCurrentAssignment?.[0]?.answers?.map(
                                (item, index) => (
                                    <Button
                                        key={index}
                                        disabled={
                                            roomInfo?.gameCurrentAnswer
                                                ? true
                                                : false
                                        }
                                        onClick={() => {
                                            handleUserAnswer(index)
                                        }}
                                        className={
                                            roomInfo?.gameCurrentAnswer &&
                                            abcd[index] ===
                                                roomInfo
                                                    ?.gameCurrentAssignment?.[0]
                                                    ?.correctAnswer
                                                ? 'answer-correct'
                                                : roomInfo?.gameCurrentAnswer &&
                                                  abcd[index] ===
                                                      roomInfo?.gameCurrentAnswer &&
                                                  roomInfo
                                                      ?.gameCurrentAssignment?.[0]
                                                      ?.correctAnswer !==
                                                      roomInfo?.gameCurrentAnswer
                                                ? 'answer-incorrect'
                                                : ''
                                        }
                                    >
                                        {abcd[index]}
                                        {`. `}
                                        {item}
                                    </Button>
                                )
                            )}
                        </div>
                    )}
            </div>
        </>
    )
}

export default QnaCategory
