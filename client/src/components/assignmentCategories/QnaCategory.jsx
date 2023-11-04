import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import './assignmentCategories.css'

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
            <div className="assignment-category-box">
                {/* <div className="category-navbar">
                    <TextGradient text={`Quizz`} size={45}></TextGradient>
                    <TextGradient text={`CATEGORY`} size={14}></TextGradient>
                </div> */}

                {roomInfo?.gameCurrentAssignment?.[0] &&
                    authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                        <div className="category-box">
                            <>
                                {/* question */}
                                <h4>
                                    {
                                        roomInfo?.gameCurrentAssignment?.[0]
                                            ?.question
                                    }
                                </h4>

                                {/* answers */}
                                <div className="category-answer-pick-box">
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
                                                // className="category-answer-pick-item"
                                                className={
                                                    !roomInfo?.gameCurrentAnswer
                                                        ? 'category-answer-pick-item'
                                                        : roomInfo?.gameCurrentAnswer &&
                                                          abcd[index] ===
                                                              roomInfo
                                                                  ?.gameCurrentAssignment?.[0]
                                                                  ?.correctAnswer
                                                        ? 'category-answer-pick-item answer-correct'
                                                        : roomInfo?.gameCurrentAnswer &&
                                                          abcd[index] ===
                                                              roomInfo?.gameCurrentAnswer &&
                                                          roomInfo
                                                              ?.gameCurrentAssignment?.[0]
                                                              ?.correctAnswer !==
                                                              roomInfo?.gameCurrentAnswer
                                                        ? 'category-answer-pick-item answer-incorrect'
                                                        : 'category-answer-pick-item'
                                                }

                                                // style={
                                                //     roomInfo?.gameCurrentAnswer &&
                                                //     abcd[index] ===
                                                //         roomInfo
                                                //             ?.gameCurrentAssignment?.[0]
                                                //             ?.correctAnswer
                                                //         ? {
                                                //               backgroundColor:
                                                //                   'lighgreen !important',
                                                //           }
                                                //         : roomInfo?.gameCurrentAnswer &&
                                                //           abcd[index] ===
                                                //               roomInfo?.gameCurrentAnswer &&
                                                //           roomInfo
                                                //               ?.gameCurrentAssignment?.[0]
                                                //               ?.correctAnswer !==
                                                //               roomInfo?.gameCurrentAnswer
                                                //         ? {
                                                //               backgroundColor:
                                                //                   'red !important',
                                                //           }
                                                //         : {}
                                                // }
                                            >
                                                {abcd[index]}
                                                {`. `}
                                                {item}
                                            </Button>
                                        )
                                    )}
                                </div>
                            </>
                        </div>
                    )}
            </div>
        </>
    )
}

export default QnaCategory
