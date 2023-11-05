import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
// import './controlPanel.css'
import DiceRoll from '../dice/diceRoll'

const ControlPanelGame = () => {
    const { authInfo, roomInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()

    const getRandomCategoryAssignment = () => {
        socket.emit('gameGetCategoryAssignment', { room_id: roomInfo?._id })
    }

    const handleNextPlayerRound = () => {
        socket.emit('gameNextPlayerRound', { room_id: roomInfo?._id })
    }

    const [ready, setReady] = useState(false)
    const readyToggle = () => {
        setReady(!ready)
        socket.emit('gameUserReady', { room_id: roomInfo?._id, ready: !ready })
    }

    return (
        <>
            <div className="control-panel-box">
                <div className="control-panel">
                    {/* if current user */}
                    {roomInfo?.game &&
                        authInfo?._id ===
                            roomInfo?.gameCurrentUser?.[0]?._id && (
                            <>
                                {/* Roll the Dice */}
                                {!roomInfo?.gameCurrentCategory &&
                                    !roomInfo?.gameCurrentDice && (
                                        <DiceRoll></DiceRoll>
                                    )}

                                {/* Get random category assignment */}
                                {roomInfo?.gameCurrentDice &&
                                    !roomInfo?.gameCurrentAssignment?.[0] && (
                                        <Button
                                            variant="dark"
                                            className="btn-control-panel"
                                            onClick={
                                                getRandomCategoryAssignment
                                            }
                                        >
                                            Wylosuj Kategorie
                                        </Button>
                                    )}

                                {roomInfo?.gameCurrentDice &&
                                    roomInfo?.gameCurrentCategory &&
                                    !roomInfo?.gameCurrentAnswer && (
                                        <p style={{ margin: '0px' }}>
                                            Wybierz odpowiedź...
                                        </p>
                                    )}

                                {/* Display Next Player btn after round is played */}
                                {roomInfo?.gameCurrentDice &&
                                    roomInfo?.gameCurrentCategory &&
                                    roomInfo?.gameCurrentAnswer && (
                                        <Button
                                            variant="dark"
                                            className="btn-control-panel"
                                            onClick={handleNextPlayerRound}
                                        >
                                            Next Player
                                        </Button>
                                    )}
                            </>
                        )}

                    {/* if not current user round */}
                    {roomInfo?.game &&
                        authInfo?._id !==
                            roomInfo?.gameCurrentUser?.[0]?._id && (
                            <p>{`${roomInfo?.gameCurrentUser?.[0]?.userId}'s round.`}</p>
                        )}

                    {/* if !game display Ready Btn */}
                    {!roomInfo?.game && (
                        <div
                            className="btn-ready-toggle"
                            style={
                                ready
                                    ? { backgroundColor: 'lightgreen' }
                                    : { backgroundColor: 'gray' }
                            }
                            onClick={readyToggle}
                        >
                            {ready ? 'Ready' : 'Not Ready'}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ControlPanelGame