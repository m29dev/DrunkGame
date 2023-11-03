import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import DiceRoll from '../dice/diceRoll'
import DiceDisplay from '../dice/DiceDisplay'
import AssignmentDisplay from '../assignment/AssignmentDisplay'
import AssignmentDisplayNonPlayable from '../assignment/AssignmentDisplayNonPlayable'

const Game = () => {
    const { authInfo, roomInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()

    const handleNextPlayerRound = () => {
        socket.emit('gameNextPlayerRound', { room_id: roomInfo?._id })
    }

    return (
        <>
            <h1>{authInfo?.userId}</h1>

            {/* current user round */}
            {authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                <div>
                    <h4>{authInfo?.userId} its your round!</h4>
                    <Button variant="dark" onClick={handleNextPlayerRound}>
                        Next Player
                    </Button>

                    {/* game */}
                    <DiceRoll></DiceRoll>
                    <DiceDisplay></DiceDisplay>
                    <AssignmentDisplay></AssignmentDisplay>
                </div>
            )}

            {/* other user round */}
            {authInfo?._id !== roomInfo?.gameCurrentUser?.[0]?._id && (
                <div>
                    <h4>Its {roomInfo?.gameCurrentUser?.[0]?.userId}s round</h4>

                    {/* game */}
                    <DiceDisplay></DiceDisplay>
                    <AssignmentDisplayNonPlayable></AssignmentDisplayNonPlayable>
                </div>
            )}
        </>
    )
}

export default Game
