import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'

const ControlPanelGame = () => {
    const { authInfo, roomInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()

    const handleNextPlayerRound = () => {
        socket.emit('gameNextPlayerRound', { room_id: roomInfo?._id })
    }

    return (
        <>
            <div className="control-panel">
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

export default ControlPanelGame
