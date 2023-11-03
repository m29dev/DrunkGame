import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './rooms.css'
import {
    useRoomCreateMutation,
    useRoomUserJoinMutation,
} from '../../services/roomService'

const GameRoomsPage = () => {
    const { authInfo, userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    // init config
    useEffect(() => {
        if (!authInfo) navigate('/home')
    })

    // join room config
    const [getRoomId] = useRoomUserJoinMutation()
    const [room, setRoom] = useState('')
    const handleJoinRoom = async (e) => {
        try {
            e.preventDefault()
            if (room === '') return

            const res = await getRoomId({ roomId: room }).unwrap()
            navigate(`/rooms/${res?.room_id}`)
        } catch (err) {
            console.log(err?.data?.message)
            window.alert(err?.data?.message)
        }
    }

    // create room config
    const [roomName, setRoomName] = useState('')
    const [roomCreate] = useRoomCreateMutation()
    const onRoomCreate = async () => {
        try {
            const res = await roomCreate({ roomId: roomName }).unwrap()
            navigate(`/rooms/${res?._id}`)
        } catch (err) {
            console.log(err?.data?.message)
            window.alert(err?.data?.message)
        }
    }

    return (
        <>
            <div className="page-container">
                <h1>Welcome {userInfo?.userId}</h1>

                <hr />

                {/* join room */}
                <label>Join Room</label>
                <form className="form-container" onSubmit={handleJoinRoom}>
                    <input
                        className="form-container-input"
                        type="text"
                        placeholder="Room ID"
                        onChange={(e) => {
                            setRoom(e.target.value)
                        }}
                        value={room}
                    />
                    <Button
                        variant="dark"
                        disabled={room ? false : true}
                        className="form-container-btn"
                        onClick={handleJoinRoom}
                    >
                        Join room
                    </Button>
                </form>

                <hr />

                {/* create room  */}
                <label>Create Room</label>
                <form
                    className="form-container"
                    onSubmit={(e) => {
                        e.preventDefault()
                        onRoomCreate()
                    }}
                >
                    <input
                        className="form-container-input"
                        type="text"
                        placeholder="Room ID"
                        onChange={(e) => {
                            setRoomName(e.target.value)
                        }}
                        value={roomName}
                    />

                    <Button
                        variant="dark"
                        disabled={roomName ? false : true}
                        className="form-container-btn"
                        onClick={(e) => {
                            e.preventDefault()
                            onRoomCreate()
                        }}
                    >
                        Create room
                    </Button>
                </form>
            </div>
        </>
    )
}

export default GameRoomsPage
