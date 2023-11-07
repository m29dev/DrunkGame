import { useSelector } from 'react-redux'
import DiceDisplay from '../dice/DiceDisplay'
import TextGradient from '../textGradient/TextGradient'
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
                    <div className="game-navbar">
                        <h1>{authInfo?.userId}</h1>

                        {/* Display rolled dice */}
                        {roomInfo?.gameCurrentDice && (
                            <DiceDisplay></DiceDisplay>
                        )}
                    </div>

                    {roomInfo?.gameCurrentCategory && (
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
                                size={40}
                            ></TextGradient>
                            <div className="paragraph">
                                <TextGradient
                                    text={`CATEGORY`}
                                    size={14}
                                ></TextGradient>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default NavbarGame
