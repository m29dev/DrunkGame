import { useSelector } from 'react-redux'
import AssignmentDisplay from '../assignment/AssignmentDisplay'
import AssignmentDisplayNonPlayable from '../assignment/AssignmentDisplayNonPlayable'
import './game.css'
import NavbarGame from '../navbar/NavbarGame'
import ControlPanelGame from '../controlPanel/ControlPanelGame'

const Game = () => {
    const { authInfo, roomInfo } = useSelector((state) => state.auth)

    return (
        <>
            {/* navabr */}
            <NavbarGame></NavbarGame>

            {/* game */}
            <div className="game-box">
                {/* current user round */}
                {authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                    <div>
                        {/* <h4>{authInfo?.userId} its your round!</h4> */}

                        {/* Roll the Dice */}
                        {/* {!roomInfo?.gameCurrentDice && <DiceRoll></DiceRoll>} */}

                        {/* Display User's assignment */}
                        {roomInfo?.gameCurrentDice && (
                            <AssignmentDisplay></AssignmentDisplay>
                        )}
                    </div>
                )}

                {/* other user round */}
                {authInfo?._id !== roomInfo?.gameCurrentUser?.[0]?._id && (
                    <div>
                        {/* <h4>
                            Its {roomInfo?.gameCurrentUser?.[0]?.userId}s round
                        </h4> */}

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

            <ControlPanelGame></ControlPanelGame>
        </>
    )
}

export default Game
