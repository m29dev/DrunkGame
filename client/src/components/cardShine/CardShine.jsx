import { useSelector } from 'react-redux'
import './cardShine.css'

// eslint-disable-next-line react/prop-types
const CardShine = () => {
    const { roomInfo } = useSelector((state) => state.auth)

    return (
        <div className="contain">
            <div className="card">
                <div className="shine"></div>

                <div className="category-box">
                    {roomInfo?.gameCurrentAssignment?.[0] && (
                        <div>
                            <h4>
                                {
                                    roomInfo?.gameCurrentAssignment?.[0]
                                        ?.challenge
                                }
                            </h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardShine
