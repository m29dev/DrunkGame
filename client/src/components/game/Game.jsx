import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import DiceRoll from '../dice/diceRoll'
import DiceDisplay from '../dice/DiceDisplay'
import AssignmentDisplay from '../assignment/AssignmentDisplay'
import AssignmentDisplayNonPlayable from '../assignment/AssignmentDisplayNonPlayable'
import './game.css'

const Game = () => {
    const { authInfo, roomInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()

    const handleNextPlayerRound = () => {
        socket.emit('gameNextPlayerRound', { room_id: roomInfo?._id })
    }

    return (
        <>
            {/* navabr */}
            <div className="game-navbar">
                <h1>{authInfo?.userId}</h1>

                {/* Display rolled dice */}
                {roomInfo?.gameCurrentDice && <DiceDisplay></DiceDisplay>}
            </div>

            {/* game */}
            <div className="game-box">
                {/* current user round */}
                {authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                    <div>
                        <h4>{authInfo?.userId} its your round!</h4>

                        {/* Roll the Dice */}
                        {!roomInfo?.gameCurrentDice && <DiceRoll></DiceRoll>}

                        {/* Display User's assignment */}
                        {roomInfo?.gameCurrentDice && (
                            <AssignmentDisplay></AssignmentDisplay>
                        )}
                    </div>
                )}

                {/* other user round */}
                {authInfo?._id !== roomInfo?.gameCurrentUser?.[0]?._id && (
                    <div>
                        <h4>
                            Its {roomInfo?.gameCurrentUser?.[0]?.userId}s round
                        </h4>

                        {/* game */}

                        {/* Display current users's assignment */}
                        {roomInfo?.gameCurrentCategory === 'mostLikelyTo' && (
                            <AssignmentDisplay></AssignmentDisplay>
                        )}

                        {roomInfo?.gameCurrentCategory !== 'mostLikelyTo' && (
                            <AssignmentDisplayNonPlayable></AssignmentDisplayNonPlayable>
                        )}
                    </div>
                )}
            </div>

            <div className="game-controls">
                {/* Display Next Player btn after round is played */}
                {authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                    <Button variant="dark" onClick={handleNextPlayerRound}>
                        Next Player
                    </Button>
                )}
            </div>
        </>
    )
}

export default Game
