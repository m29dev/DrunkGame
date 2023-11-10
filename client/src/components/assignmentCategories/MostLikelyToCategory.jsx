import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import './assignmentCategories.css'
import CardShine from '../cardShine/CardShine'

const MostLikelyToCategory = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()
    const [voted, setVoted] = useState(false)
    const [pickedUser, setPickedUser] = useState(null)
    const [hideCard, setHideCard] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setHideCard(true)
        }, 3000)
    }, [])

    const handleUserSelect = (user) => {
        console.log(user._id, user.userId)

        socket.emit('gameAssignmentAnswer', {
            room_id: roomInfo?._id,
            answer: user._id,
        })
    }

    useEffect(() => {
        roomInfo?.gameCurrentAssignment?.[2]?.votes?.map((vote) => {
            if (vote?.voter === authInfo?._id) {
                return setVoted(true)
            }
        })
    }, [roomInfo, authInfo, setVoted])

    useEffect(() => {
        if (roomInfo?.gameCurrentAnswer) {
            const user_id = roomInfo?.gameCurrentAnswer
            roomInfo?.users?.map((user) => {
                if (user._id === user_id) {
                    console.log('Picked User: ', user)
                    setPickedUser(user)
                }
            })
        }
    }, [roomInfo])

    return (
        <>
            <div className="assignment-category-box">
                {!roomInfo?.gameCurrentAnswer && !pickedUser && (
                    <div className="category-box">
                        {roomInfo?.gameCurrentAssignment?.[0] && (
                            <>
                                {/* question */}
                                <h4>
                                    {
                                        roomInfo?.gameCurrentAssignment?.[0]
                                            ?.question
                                    }
                                </h4>

                                {/* users to pick */}
                                <div className="category-answer-pick-box">
                                    {roomInfo?.gameCurrentAssignment?.[1]?.usersToVote?.map(
                                        (item, index) => (
                                            <div
                                                className="pick-item-border-box"
                                                key={index}
                                            >
                                                <Button
                                                    key={index}
                                                    className="category-answer-pick-item btn-pick-item"
                                                    disabled={voted}
                                                    onClick={() => {
                                                        handleUserSelect(item)
                                                    }}
                                                >
                                                    {item.userId}
                                                </Button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* on currentAnswer */}
                {roomInfo?.gameCurrentAnswer && pickedUser && (
                    <div className="category-box">
                        <h4>
                            {`Rabini przemówili...`}
                            <br />
                            {pickedUser?.userId}{' '}
                            {roomInfo?.gameCurrentAssignment?.[0]?.question.slice(
                                4,
                                -1
                            )}
                            .
                        </h4>
                        <h4>
                            Fantastycznie {pickedUser?.userId}, w nagrode napij
                            się kielona.
                        </h4>
                    </div>
                )}
            </div>
        </>
    )
}

export default MostLikelyToCategory
