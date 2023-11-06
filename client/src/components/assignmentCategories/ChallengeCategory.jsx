import { useSelector } from 'react-redux'
import './assignmentCategories.css'
import CardShine from '../cardShine/CardShine'

const ChallengeCategory = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)

    return (
        <>
            <div className="assignment-category-box">
                {/* {roomInfo?.gameCurrentUser?.[0]?._id !== authInfo?._id && (
                    <div>
                        <h4>{`${roomInfo?.gameCurrentUser?.[0]?.userId}'s challenge:`}</h4>
                    </div>
                )} */}

                {/* <div className="category-box">
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
                </div> */}

                <CardShine></CardShine>
            </div>
        </>
    )
}

export default ChallengeCategory
