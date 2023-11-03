import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import './assignment.css'
import { useOutletContext } from 'react-router-dom'

const AssignmentDisplay = () => {
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

    const getRandomQna = () => {
        socket.emit('gameGetAssignment', { room_id: roomInfo?._id })
    }

    return (
        <>
            <div>
                {!roomInfo?.gameCurrentAssignment?.[0] &&
                    authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                        <Button onClick={getRandomQna}>Get QnA</Button>
                    )}

                {roomInfo?.gameCurrentAssignment?.[0] &&
                    authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                        <div>
                            <h4>
                                {roomInfo?.gameCurrentAssignment?.[0]?.question}
                            </h4>
                            {roomInfo?.gameCurrentAssignment?.[0]?.answers?.map(
                                (item, index) => (
                                    // <h4
                                    //     key={index}
                                    //     className="answer-box"
                                    //     onClick={() => {
                                    //         handleUserAnswer(index)
                                    //     }}
                                    // >
                                    //     {abcd[index]}
                                    //     {`. `}
                                    //     {item}
                                    // </h4>
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

export default AssignmentDisplay
