import { useSelector } from 'react-redux'
import TextGradient from '../textGradient/TextGradient'

const ChallengeCategory = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)

    return (
        <>
            <TextGradient text={`Challenge`} size={40}></TextGradient>

            <div>
                {roomInfo?.gameCurrentAssignment?.[0] &&
                    authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
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
        </>
    )
}

export default ChallengeCategory
