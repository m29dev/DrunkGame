import { useSelector } from 'react-redux'
import './assignment.css'
import { Button } from 'react-bootstrap'

const AssignmentDisplayNonPlayable = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)
    const abcd = ['A', 'B', 'C', 'D']

    return (
        <>
            <div>
                {roomInfo?.gameCurrentAssignment?.[0] &&
                    authInfo?._id !== roomInfo?.gameCurrentUser?.[0]?._id && (
                        <div>
                            <h4>
                                {roomInfo?.gameCurrentAssignment?.[0]?.question}
                            </h4>
                            {roomInfo?.gameCurrentAssignment?.[0]?.answers?.map(
                                (item, index) => (
                                    <Button
                                        key={index}
                                        disabled={true}
                                        className={
                                            roomInfo?.gameCurrentAnswer &&
                                            abcd[index] ===
                                                roomInfo
                                                    ?.gameCurrentAssignment?.[0]
                                                    ?.correctAnswer
                                                ? 'answer-correct'
                                                : roomInfo?.gameCurrentAnswer &&
                                                  abcd[index] ===
                                                      roomInfo?.gameCurrentAnswer &&
                                                  roomInfo
                                                      ?.gameCurrentAssignment?.[0]
                                                      ?.correctAnswer !==
                                                      roomInfo?.gameCurrentAnswer
                                                ? 'answer-incorrect'
                                                : ''
                                        }
                                    >
                                        {abcd[index]}
                                        {`. `}
                                        {item}
                                    </Button>
                                )
                            )}
                        </div>
                    )}
            </div>
        </>
    )
}

export default AssignmentDisplayNonPlayable
