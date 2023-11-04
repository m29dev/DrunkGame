import { useSelector } from 'react-redux'
import './assignment.css'
import QnaCategory from '../assignmentCategories/QnaCategory'
import ChallengeCategory from '../assignmentCategories/ChallengeCategory'
import MostLikelyToCategory from '../assignmentCategories/MostLikelyToCategory'

const AssignmentDisplay = () => {
    const { roomInfo } = useSelector((state) => state.auth)

    return (
        <>
            {/* QnA category */}
            {roomInfo?.gameCurrentCategory === 'qna' && (
                <QnaCategory></QnaCategory>
            )}

            {/* Challenge category */}
            {roomInfo?.gameCurrentCategory === 'challenge' && (
                <ChallengeCategory></ChallengeCategory>
            )}

            {/* MostLikelyTo category */}
            {roomInfo?.gameCurrentCategory === 'mostLikelyTo' && (
                <MostLikelyToCategory></MostLikelyToCategory>
            )}
        </>
    )
}

export default AssignmentDisplay
