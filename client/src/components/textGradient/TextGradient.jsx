import { LinearGradient } from 'react-text-gradients'
import './textGradient.css'

const TextGradient = (data) => {
    return (
        <>
            <LinearGradient
                gradient={['to left', 'lightblue, #EAECEC']}
                style={
                    data?.size
                        ? { fontSize: `${data?.size}px`, fontWeight: '700' }
                        : { fontWeight: '700' }
                }
            >
                {data?.text}
            </LinearGradient>
        </>
    )
}

export default TextGradient
