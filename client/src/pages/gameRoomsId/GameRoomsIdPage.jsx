import { useCallback, useEffect, useState } from 'react'
import { useRoomReadMutation } from '../../services/roomService'
import { useOutletContext, useParams } from 'react-router-dom'
import { useUserReadMutation } from '../../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { setRoomInfo, setUserInfo } from '../../redux/authSlice'
import './roomId.css'
import Game from '../../components/game/Game'
import TextGradient from '../../components/textGradient/TextGradient'

const GameRoomsIdPage = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()
    const params = useParams()
    const dispatch = useDispatch()

    const [ready, setReady] = useState(false)
    const readyToggle = () => {
        setReady(!ready)
        socket.emit('gameUserReady', { room_id: roomInfo?._id, ready: !ready })
    }

    // Fetch Room on init
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
    useEffect(() => {
        getRoomData()
    }, [getRoomData])

    // Fetch User on init
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
    useEffect(() => {
        getUserData()
    }, [getUserData])

    // Socket join room on init
    useEffect(() => {
        const _id = params.id
        socket.emit('roomJoin', {
            room_id: _id,
        })
    }, [socket, params])

    // Socket on gameStart event
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

    // Socket on ALL roomInfo updates event
    useEffect(() => {
        const handleRoomInfoUpdate = (data) => {
            dispatch(setRoomInfo(data))
        }

        socket.on('clientRoomInfoUpdate', (data) => {
            handleRoomInfoUpdate(data)
        })
        return () => {
            socket.off('clientRoomInfoUpdate')
        }
    }, [socket, dispatch])

    // Socket on ALL userInfo updates event
    useEffect(() => {
        const handleUserInfoUpdate = (data) => {
            console.log('update userInfo')
            dispatch(setUserInfo(data))
        }

        socket.on('clientUserInfoUpdate', (data) => {
            handleUserInfoUpdate(data)
        })
        return () => {
            socket.off('clientUserInfoUpdate')
        }
    }, [socket, dispatch])

    return (
        <>
            {!roomInfo?.game && (
                <div className="box-home">
                    {/* navbar */}
                    <div className="navbar" style={{ height: '150px' }}>
                        <div
                            className="game-navbar"
                            style={{ justifyContent: 'center' }}
                        >
                            <TextGradient
                                text={`Booze Game`}
                                size={50}
                            ></TextGradient>
                        </div>

                        {authInfo && (
                            <h1 style={{ marginTop: '30px' }}>
                                {authInfo?.userId}
                            </h1>
                        )}
                    </div>

                    {/* users in the room */}
                    <div className="box-main">
                        <h4>Users: </h4>
                        <br />
                        {roomInfo?.users?.map(
                            (user, index) =>
                                user?.active && (
                                    <h5 key={index}>{user?.userId}</h5>
                                )
                        )}
                    </div>

                    {/* control panel */}
                    <div
                        className="control-panel"
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
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
                </div>
            )}

            {roomInfo?.game && <Game></Game>}
        </>
    )
}

export default GameRoomsIdPage
