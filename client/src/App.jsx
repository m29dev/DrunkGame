import { useSelector } from 'react-redux'
import './App.css'
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

//init socket io
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import GameInit from './components/gameInitLoading/GameInit'
// const socket = io('https://drunkgameserver.onrender.com', {
//     autoConnect: false,
// })

const socket = io('http://localhost:3000', {
    autoConnect: false,
})

function App() {
    const { authInfo } = useSelector((state) => state.auth)
    socket.auth = { userId: authInfo?.userId, user_id: authInfo?._id }
    socket.connect()
    const [gameInit, setGameInit] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setGameInit(true)
        }, 4000)
    })

    return (
        <>
            {!gameInit && <GameInit></GameInit>}

            {gameInit && (
                <Container className="container-box">
                    <Outlet context={[socket]}></Outlet>
                </Container>
            )}
        </>
    )
}

export default App
