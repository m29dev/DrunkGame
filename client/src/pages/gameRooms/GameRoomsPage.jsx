import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './rooms.css'
import {
    useRoomCreateMutation,
    useRoomUserJoinMutation,
} from '../../services/roomService'
import TextGradient from '../../components/textGradient/TextGradient'

const GameRoomsPage = () => {
    const { authInfo } = useSelector((state) => state.auth)
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
            {/* <div className="page-container">
                <h1>Welcome {userInfo?.userId}</h1>

                <hr />

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
            </div> */}

            <div className="box-home">
                {/* navbar */}
                <div className="navbar" style={{ height: '150px' }}>
                    <div
                        className="game-navbar"
                        style={{ justifyContent: 'center' }}
                    >
                        <TextGradient
                            text={`Booze Game`}
                            size={'10vw'}
                        ></TextGradient>
                    </div>

                    {/* {authInfo && (
                        <h1 style={{ margin: '0px' }}>{authInfo?.userId}</h1>
                    )} */}
                </div>

                <div className="box-main" style={{ justifyContent: 'center' }}>
                    {/* join room */}
                    {/* <label>Join Room</label> */}
                    <form
                        className="form-container"
                        style={{ margin: '20px' }}
                        onSubmit={handleJoinRoom}
                    >
                        <input
                            className="form-container-input"
                            type="text"
                            placeholder="room name..."
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

                    {/* create room  */}
                    {/* <label>Create Room</label> */}
                    <form
                        className="form-container"
                        style={{ margin: '20px' }}
                        onSubmit={(e) => {
                            e.preventDefault()
                            onRoomCreate()
                        }}
                    >
                        <input
                            className="form-container-input"
                            type="text"
                            placeholder="room name..."
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
            </div>
        </>
    )
}

export default GameRoomsPage
