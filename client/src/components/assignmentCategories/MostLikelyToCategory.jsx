import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import TextGradient from '../textGradient/TextGradient'

const MostLikelyToCategory = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()
    const [voted, setVoted] = useState(false)
    const [pickedUser, setPickedUser] = useState(null)

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
            <TextGradient text={`Most Likely To...`} size={45}></TextGradient>

            {!roomInfo?.gameCurrentAnswer && !pickedUser && (
                <div>
                    {roomInfo?.gameCurrentAssignment?.[0] && (
                        <div>
                            <h4>
                                {roomInfo?.gameCurrentAssignment?.[0]?.question}
                            </h4>
                            {roomInfo?.gameCurrentAssignment?.[1]?.usersToVote?.map(
                                (item, index) => (
                                    <Button
                                        key={index}
                                        disabled={voted}
                                        onClick={() => {
                                            handleUserSelect(item)
                                        }}
                                    >
                                        {item.userId}
                                    </Button>
                                )
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* on currentAnswer */}
            {roomInfo?.gameCurrentAnswer && pickedUser && (
                <div>
                    <h4>
                        {`Najprawdopodobniej... `}
                        {pickedUser?.userId}{' '}
                        {roomInfo?.gameCurrentAssignment?.[0]?.question.slice(
                            22,
                            -1
                        )}
                        .
                    </h4>
                    <h4>
                        Gratulacje {pickedUser?.userId}, w nagrode napij się
                        kielona.
                    </h4>
                </div>
            )}
        </>
    )
}

export default MostLikelyToCategory
