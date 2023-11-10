import { useSelector } from 'react-redux'
import DiceDisplay from '../dice/DiceDisplay'
import './navbar.css'
// import { useOutletContext } from 'react-router-dom'

const NavbarGame = () => {
    const { authInfo, roomInfo } = useSelector((state) => state.auth)
    // const [socket] = useOutletContext()

    // const getRandomCategoryAssignment = () => {
    //     socket.emit('gameGetCategoryAssignment', { room_id: roomInfo?._id })
    // }

    return (
        <>
            {roomInfo?.game && (
                <div className="navbar">
                    {/* DISPLAY IF CURRENT CATEGORY DOES NOT EXIST*/}
                    {/* {!roomInfo?.gameCurrentCategory && (
                        <div className="game-navbar">
                            <h1>{authInfo?.userId}</h1>

                            {roomInfo?.gameCurrentDice && (
                                <DiceDisplay></DiceDisplay>
                            )}
                        </div>
                    )} */}

                    {/* DISPLAY IF CURRENT CATTEGORY EXISTS */}
                    {/* {roomInfo?.gameCurrentCategory && (
                        <div className="category-navbar">
                            <TextGradient
                                text={
                                    roomInfo?.gameCurrentCategory ===
                                    'challenge'
                                        ? 'Challenge'
                                        : roomInfo?.gameCurrentCategory ===
                                          'qna'
                                        ? 'Quizz'
                                        : roomInfo?.gameCurrentCategory ===
                                          'mostLikelyTo'
                                        ? 'Most Likely To...'
                                        : ''
                                }
                                size={`8vw`}
                            ></TextGradient>
                            <div className="paragraph">
                                <TextGradient
                                    text={`CATEGORY`}
                                    size={`4vw`}
                                ></TextGradient>
                            </div>
                        </div>
                    )} */}

                    <div className="game-navbar">
                        <h1 style={{ margin: '0px' }}>{authInfo?.userId}</h1>

                        {/* Display rolled dice */}
                        {roomInfo?.gameCurrentDice && (
                            <DiceDisplay></DiceDisplay>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default NavbarGame
