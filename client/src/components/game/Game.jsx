import { useSelector } from 'react-redux'
import AssignmentDisplay from '../assignment/AssignmentDisplay'
import './game.css'
import NavbarGame from '../navbar/NavbarGame'
import ControlPanelGame from '../controlPanel/ControlPanelGame'
// import ThreeDice from '../../three/threeDice'
// import ThreeFiberDice from '../../three/ThreeFiberDice'

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
                    <AssignmentDisplay></AssignmentDisplay>
                )}

                {/* other user round */}
                {authInfo?._id !== roomInfo?.gameCurrentUser?.[0]?._id && (
                    <AssignmentDisplay></AssignmentDisplay>
                )}

                {/* TEST */}
                {/* {!roomInfo?.gameCurrentDice && (
                    <ThreeFiberDice></ThreeFiberDice>
                )} */}

                {/* DISPLAY CURRENT POSITION (PLAYER POINTS) */}
                {/* {!roomInfo?.gameCurrentAssignment?.[0] && (
                    <div className="game-board-box">
                        <div className="game-board">{userInfo?.points}</div>
                    </div>
                )} */}
            </div>

            <ControlPanelGame></ControlPanelGame>
        </>
    )
}

export default Game
