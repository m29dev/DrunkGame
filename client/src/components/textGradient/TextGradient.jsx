import { LinearGradient } from 'react-text-gradients'
import './textGradient.css'

const TextGradient = (data) => {
    return (
        <>
            <LinearGradient
                // gradient={['to left', 'lightblue, #EAECEC']}
                // gradient={['to left', 'violet, violet']}
                // gradient={['to right', 'lightblue, violet']}
                gradient={['to right', 'violet, purple']}
                className="text-style"
                style={
                    data?.size
                        ? {
                              fontSize: `${data?.size}`,
                              fontWeight: '700',
                          }
                        : {
                              fontWeight: '700',
                          }
                }
            >
                {data?.text}
            </LinearGradient>
        </>
    )
}

export default TextGradient
