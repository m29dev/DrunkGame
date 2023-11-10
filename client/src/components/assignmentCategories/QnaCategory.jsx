import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import './assignmentCategories.css'
import CardShine from '../cardShine/CardShine'
import { useEffect, useState } from 'react'

const QnaCategory = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()
    const [hideCard, setHideCard] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setHideCard(true)
        }, 3000)
    }, [])

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
                {roomInfo?.gameCurrentUser?.[0]?._id !== authInfo?._id && (
                    <div>
                        <h4>{`${roomInfo?.gameCurrentUser?.[0]?.userId}'s Quizz:`}</h4>
                    </div>
                )}

                {!hideCard && <CardShine></CardShine>}

                {hideCard &&
                    roomInfo?.gameCurrentAssignment?.[0] &&
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
                                            <div
                                                // className="pick-item-border-box"
                                                className={
                                                    !roomInfo?.gameCurrentAnswer
                                                        ? 'pick-item-border-box'
                                                        : roomInfo?.gameCurrentAnswer &&
                                                          abcd[index] ===
                                                              roomInfo
                                                                  ?.gameCurrentAssignment?.[0]
                                                                  ?.correctAnswer
                                                        ? 'pick-item-border-box answer-border-correct'
                                                        : roomInfo?.gameCurrentAnswer &&
                                                          abcd[index] ===
                                                              roomInfo?.gameCurrentAnswer &&
                                                          roomInfo
                                                              ?.gameCurrentAssignment?.[0]
                                                              ?.correctAnswer !==
                                                              roomInfo?.gameCurrentAnswer
                                                        ? 'pick-item-border-box answer-border-incorrect'
                                                        : 'pick-item-border-box'
                                                }
                                                key={index}
                                            >
                                                <Button
                                                    disabled={
                                                        roomInfo?.gameCurrentAnswer
                                                            ? true
                                                            : false
                                                    }
                                                    onClick={() => {
                                                        handleUserAnswer(index)
                                                    }}
                                                    className="category-answer-pick-item btn-pick-item"
                                                    // className={
                                                    //     !roomInfo?.gameCurrentAnswer
                                                    //         ? 'category-answer-pick-item btn-pick-item'
                                                    //         : roomInfo?.gameCurrentAnswer &&
                                                    //           abcd[index] ===
                                                    //               roomInfo
                                                    //                   ?.gameCurrentAssignment?.[0]
                                                    //                   ?.correctAnswer
                                                    //         ? 'category-answer-pick-item answer-correct'
                                                    //         : roomInfo?.gameCurrentAnswer &&
                                                    //           abcd[index] ===
                                                    //               roomInfo?.gameCurrentAnswer &&
                                                    //           roomInfo
                                                    //               ?.gameCurrentAssignment?.[0]
                                                    //               ?.correctAnswer !==
                                                    //               roomInfo?.gameCurrentAnswer
                                                    //         ? 'category-answer-pick-item answer-incorrect'
                                                    //         : 'category-answer-pick-item btn-pick-item'
                                                    // }
                                                >
                                                    {abcd[index]}
                                                    {`. `}
                                                    {item}
                                                </Button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        </div>
                    )}

                {/* non current user */}
                {roomInfo?.gameCurrentAssignment?.[0] &&
                    authInfo?._id !== roomInfo?.gameCurrentUser?.[0]?._id && (
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
                                                disabled={true}
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
