import { useSelector } from 'react-redux'
import './navbar.css'
import TextGradient from '../textGradient/TextGradient'
import Auth from '../auth/Auth'

const Navbar = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)

    return (
        <>
            {!roomInfo?.game && (
                <div className="navbar" style={{ height: '150px' }}>
                    <div
                        className="game-navbar"
                        style={{ justifyContent: 'center' }}
                    >
                        <TextGradient
                            text={`Drunk Game`}
                            size={'14vw'}
                        ></TextGradient>
                    </div>

                    {!authInfo && (
                        <div style={{ marginTop: '30px' }}>
                            <Auth></Auth>
                        </div>
                    )}

                    {authInfo && (
                        <div style={{ marginTop: '10px' }}>
                            {authInfo?.userId}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Navbar
