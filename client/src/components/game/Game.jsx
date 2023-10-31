import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { setRoomInfo } from '../../redux/authSlice'

const Game = () => {
    const { authInfo, roomInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()
    const dispatch = useDispatch()

    const handleThrowDice = () => {
        console.log('Throw Dice')
    }

    const handleNextPlayerRound = () => {
        console.log('Next Player')

        socket.emit('gameNextPlayerRound', { room_id: roomInfo?._id })
    }

    useEffect(() => {
        const handleCurrentUserRound = (data) => {
            console.log(data)
            dispatch(setRoomInfo(data))
        }

        socket.on('clientCurrentUserRound', (data) =>
            handleCurrentUserRound(data)
        )

        return () => socket.off('clientCurrentUserRound')
    }, [socket, dispatch])
    return (
        <>
            <h1>{authInfo?.userId}</h1>

            {authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                <div>
                    <h4>{authInfo?.userId} its your round!</h4>
                    <Button variant="dark" onClick={handleNextPlayerRound}>
                        Next Player
                    </Button>
                </div>
            )}

            {authInfo?._id !== roomInfo?.gameCurrentUser?.[0]?._id && (
                <div>
                    <h4>Its {roomInfo?.gameCurrentUser?.[0]?.userId}s round</h4>
                </div>
            )}

            <div>
                <Button variant="dark" onClick={handleThrowDice}>
                    Throw Dice
                </Button>
            </div>
        </>
    )
}

export default Game
