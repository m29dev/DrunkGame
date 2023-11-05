import './homePage.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TextGradient from '../../components/textGradient/TextGradient'
import Auth from '../../components/auth/Auth'

const HomePage = () => {
    const { authInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (authInfo) {
            navigate('/rooms')
        }
    }, [authInfo, navigate])

    return (
        <>
            <div className="box-home">
                {/* navbar */}
                <div className="navbar" style={{ height: '150px' }}>
                    <div
                        className="game-navbar"
                        style={{ justifyContent: 'center' }}
                    >
                        <TextGradient
                            text={`Booze Game`}
                            size={50}
                        ></TextGradient>
                    </div>

                    {!authInfo && (
                        <div style={{ marginTop: '30px' }}>
                            <Auth></Auth>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default HomePage
