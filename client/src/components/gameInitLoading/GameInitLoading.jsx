import { useEffect, useState } from 'react'
import ProgressBar from '@ramonak/react-progress-bar'
import './gameInitLoading.css'

const GameInitLoading = () => {
    // const [time, setTime] = useState(0)

    // useEffect(() => {
    //     setTimeout(() => {
    //         const initTime = setInterval(() => {
    //             if (time !== 100) {
    //                 if (time !== 50) {
    //                     setTime(time + 25)
    //                     console.log(time + 25)
    //                 } else {
    //                     setTime(time + 50)
    //                     console.log(time + 50)
    //                 }
    //             } else {
    //                 clearInterval(initTime)
    //             }
    //         }, 1000)
    //     })
    // }, [time])

    return (
        <>
            <div className="game-init">
                <div>
                    <h1>Drunk Game</h1>

                    <ProgressBar
                        completed={100}
                        maxCompleted={100}
                        transitionDuration={'4s'}
                        animateOnRender={true}
                        isLabelVisible={false}
                        baseBgColor={'#191919'}
                    ></ProgressBar>
                </div>
            </div>
        </>
    )
}

export default GameInitLoading
