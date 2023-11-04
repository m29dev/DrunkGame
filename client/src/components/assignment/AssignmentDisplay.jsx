import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import './assignment.css'
import { useOutletContext } from 'react-router-dom'
import QnaCategory from '../assignmentCategories/QnaCategory'
import ChallengeCategory from '../assignmentCategories/ChallengeCategory'
import MostLikelyToCategory from '../assignmentCategories/MostLikelyToCategory'

const AssignmentDisplay = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()

    const getRandomCategoryAssignment = () => {
        socket.emit('gameGetCategoryAssignment', { room_id: roomInfo?._id })
    }

    return (
        <>
            {!roomInfo?.gameCurrentAssignment?.[0] &&
                authInfo?._id === roomInfo?.gameCurrentUser?.[0]?._id && (
                    <Button onClick={getRandomCategoryAssignment}>
                        Wylosuj Kategorie
                    </Button>
                )}

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
