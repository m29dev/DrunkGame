import { useSelector } from 'react-redux'
import './cardShine.css'

// eslint-disable-next-line react/prop-types
const CardShine = () => {
    const { roomInfo } = useSelector((state) => state.auth)

    const handleCardToggle = () => {
        document.querySelector('.flip').classList.toggle('card')
        document.querySelector('.flip').classList.toggle('flip-card-inner')

        // default front card => toggle card-front with card-back
        document.querySelector('.flip-card-0').classList.toggle('card-hidden')

        document.querySelector('.flip-card-1').classList.toggle('card-hidden')

        // default front card => toggle card-front with card-back
        // document
        //     .querySelector('.flip-card-1')
        //     .classList.toggle('flip-card-front')
        // document
        //     .querySelector('.flip-card-1')
        //     .classList.toggle('flip-card-back')

        document.querySelector('.shine-front').classList.toggle('shine-back')
        // document.querySelector('.flip').classList.toggle('card-toggle')
    }

    return (
        <div className="contain flip-card" onClick={handleCardToggle}>
            <div className="flip card">
                <div className="shine-front"></div>

                {/* Card front */}
                <div className="flip-card-0 flip-card-front">
                    {roomInfo?.gameCurrentCategory && (
                        <div className="card-navbar">
                            <h1 style={{ fontWeight: '700' }}>
                                {roomInfo?.gameCurrentCategory === 'challenge'
                                    ? 'Challenge'
                                    : roomInfo?.gameCurrentCategory === 'qna'
                                    ? 'Quizz'
                                    : roomInfo?.gameCurrentCategory ===
                                      'mostLikelyTo'
                                    ? 'Most Likely To'
                                    : ''}
                            </h1>
                            <h5 style={{ fontWeight: '600' }}>CATEGORY</h5>
                        </div>
                    )}
                </div>

                {/* Card back */}
                <div className="flip-card-1 flip-card-back card-hidden">
                    {roomInfo?.gameCurrentAssignment?.[0] && (
                        <div>
                            {roomInfo?.gameCurrentAssignment?.[0]?.challenge}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardShine
