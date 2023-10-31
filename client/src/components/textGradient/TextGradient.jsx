import { LinearGradient } from 'react-text-gradients'

const TextGradient = (data) => {
    return (
        <>
            <h1>
                <LinearGradient
                    gradient={['to left', 'lightblue, #EAECEC']}
                    // linear-gradient(90deg,#00084d 0,#1d63ed 100%);

                    style={
                        data?.size
                            ? { fontSize: `${data?.size}px`, fontWeight: '700' }
                            : { fontWeight: '700' }
                    }
                >
                    {data?.text}
                </LinearGradient>
            </h1>
        </>
    )
}

export default TextGradient
