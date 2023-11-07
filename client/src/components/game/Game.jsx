import { useSelector } from 'react-redux'
import AssignmentDisplay from '../assignment/AssignmentDisplay'
import './game.css'
import NavbarGame from '../navbar/NavbarGame'
import ControlPanelGame from '../controlPanel/ControlPanelGame'
// import ThreeDice from '../../three/threeDice'
import ThreeFiberDice from '../../three/ThreeFiberDice'

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
                        <AssignmentDisplay></AssignmentDisplay>
                    </div>
                )}

                {/* other user round */}
                {authInfo?._id !== roomInfo?.gameCurrentUser?.[0]?._id && (
                    <div style={{ justifySelf: 'center', alignSelf: 'center' }}>
                        {/* {!roomInfo?.gameCurrentDice && (
                            <>
                                <h4>
                                    {roomInfo?.gameCurrentUser?.[0]?.userId}{' '}
                                    rzuca kostką...
                                </h4>
                            </>
                        )}

                        {roomInfo?.gameCurrentDice &&
                            !roomInfo?.gameCurrentAssignment?.[0] && (
                                <h4>
                                    {roomInfo?.gameCurrentUser?.[0]?.userId}{' '}
                                    losuje kategorie...
                                </h4>
                            )} */}
                        <AssignmentDisplay></AssignmentDisplay>
                    </div>
                )}

                {/* TEST */}
                {!roomInfo?.gameCurrentDice && (
                    <ThreeFiberDice></ThreeFiberDice>
                )}
            </div>

            <ControlPanelGame></ControlPanelGame>
        </>
    )
}

export default Game
