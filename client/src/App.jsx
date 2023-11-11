import { useSelector } from 'react-redux'
import './App.css'
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

//init socket io
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import GameInit from './components/gameInitLoading/GameInit'
const socket = io('https://drunkgameserver.onrender.com', {
    autoConnect: false,
})

// const socket = io('http://localhost:3000', {
//     autoConnect: false,
// })

function App() {
    const { authInfo } = useSelector((state) => state.auth)
    socket.auth = { userId: authInfo?.userId, user_id: authInfo?._id }
    socket.connect()
    const [gameInit, setGameInit] = useState(false)
    // const [isSafari, setIsSafari] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setGameInit(true)
        }, 4000)
    })

    // useEffect(() => {
    //     // Get the user-agent string
    //     let userAgentString = navigator.userAgent
    //     // Detect Chrome
    //     let chromeAgent = userAgentString.indexOf('Chrome') > -1
    //     // Detect Safari
    //     let safariAgent = userAgentString.indexOf('Safari') > -1

    //     if (chromeAgent && safariAgent) safariAgent = false

    //     console.log('is Chrome? ', chromeAgent)
    //     console.log('is Safari? ', safariAgent)
    //     setIsSafari(safariAgent)
    // }, [])

    return (
        <>
            {!gameInit && <GameInit></GameInit>}

            {gameInit && (
                <Container
                    // className={
                    //     isSafari ? 'container-box safari-box' : 'container-box'
                    // }
                    className="container-box"
                >
                    <Outlet context={[socket]}></Outlet>
                </Container>
            )}
        </>
    )
}

export default App
