import { useSelector } from 'react-redux'
import TextGradient from '../textGradient/TextGradient'
import './assignmentCategories.css'

const ChallengeCategory = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)

    return (
        <>
            <div className="assignment-category-box">
                <div className="category-navbar">
                    <TextGradient text={`Challenge`} size={40}></TextGradient>
                    <div className="paragraph">
                        <TextGradient
                            text={`CATEGORY`}
                            size={14}
                        ></TextGradient>
                    </div>
                </div>

                <div className="category-box">
                    {roomInfo?.gameCurrentAssignment?.[0] &&
                        authInfo?._id ===
                            roomInfo?.gameCurrentUser?.[0]?._id && (
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
        </>
    )
}

export default ChallengeCategory
