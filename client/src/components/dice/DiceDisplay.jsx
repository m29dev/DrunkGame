import { useSelector } from 'react-redux'

const DiceDisplay = () => {
    const { roomInfo } = useSelector((state) => state.auth)

    return (
        <>
            {roomInfo?.gameCurrentDice && (
                <div>
                    <img
                        src={`/dices/dice_${roomInfo?.gameCurrentDice}.png`}
                        className="dice"
                    />
                </div>
            )}
        </>
    )
}

export default DiceDisplay
