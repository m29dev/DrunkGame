import { useCallback, useEffect, useState } from 'react'
import { useRoomReadMutation } from '../../services/roomService'
import { useOutletContext, useParams } from 'react-router-dom'
import { useUserReadMutation } from '../../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { setRoomInfo, setUserInfo } from '../../redux/authSlice'
import './roomId.css'
import Game from '../../components/game/Game'

const GameRoomsIdPage = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()
    const params = useParams()
    const dispatch = useDispatch()

    // Fetch Room config
    const [getRoom] = useRoomReadMutation()
    const getRoomData = useCallback(async () => {
        try {
            const _id = params.id
            const res = await getRoom({ _id }).unwrap()
            dispatch(setRoomInfo(res))
            console.log('Room: ', res)
        } catch (err) {
            console.log(err)
        }
    }, [getRoom, params, dispatch])
    // on init
    useEffect(() => {
        getRoomData()
    }, [getRoomData])

    // Fetch User config
    const [getUser] = useUserReadMutation()
    const getUserData = useCallback(async () => {
        try {
            const res = await getUser({ _id: authInfo?._id }).unwrap()
            dispatch(setUserInfo(res))
            console.log('User: ', res)
        } catch (err) {
            console.log(err)
        }
    }, [getUser, authInfo, dispatch])
    // on init
    useEffect(() => {
        getUserData()
    }, [getUserData])

    // Socket config
    useEffect(() => {
        const _id = params.id
        socket.emit('roomJoin', {
            room_id: _id,
        })
    }, [socket, params])

    // on User Join / User Leave the Room event
    useEffect(() => {
        const handleRoomToggle = (roomObject) => {
            console.log('handle room join')
            dispatch(setRoomInfo(roomObject))
        }

        socket.on('roomUserToggle', (roomObject) =>
            handleRoomToggle(roomObject)
        )
        return () => {
            socket.off('roomUserToggle')
        }
    }, [socket, dispatch])

    const [ready, setReady] = useState(false)
    const readyToggle = () => {
        setReady(!ready)

        socket.emit('gameUserReady', { room_id: roomInfo?._id, ready: !ready })
    }

    // on gameStart
    useEffect(() => {
        const handleGameStart = () => {
            const roomInfoClone = { ...roomInfo }
            roomInfoClone.game = true
            dispatch(setRoomInfo(roomInfoClone))

            // startRound
            socket.emit('gameNextPlayerRound', { room_id: roomInfo?._id })
        }

        socket.on('gameStart', (data) => handleGameStart(data))
        return () => socket.off('gameStart')
    }, [socket, dispatch, roomInfo])

    return (
        <>
            {!roomInfo?.game && (
                <>
                    <div>{roomInfo?.roomId}</div>
                    <hr />

                    <div>
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
                    </div>
                    <hr />

                    <div>
                        <h4>Users: </h4>
                        <br />
                        {roomInfo?.users?.map(
                            (user, index) =>
                                user?.active && (
                                    <h5 key={index}>{user?.userId}</h5>
                                )
                        )}
                    </div>
                </>
            )}

            {roomInfo?.game && <Game></Game>}
        </>
    )
}

export default GameRoomsIdPage
