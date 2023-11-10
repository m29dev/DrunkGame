import ProgressBar from '@ramonak/react-progress-bar'
import './gameInitLoading.css'

const GameInit = () => {
    return (
        <>
            <div className="game-init">
                <div>
                    <h1>Drunk Game</h1>

                    <ProgressBar
                        completed={100}
                        maxCompleted={100}
                        transitionDuration={'4s'}
                        animateOnRender={true}
                        isLabelVisible={false}
                        baseBgColor={'#191919'}
                    ></ProgressBar>
                </div>
            </div>
        </>
    )
}

export default GameInit
