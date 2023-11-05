import { useSelector } from 'react-redux'
import './navbar.css'
import TextGradient from '../textGradient/TextGradient'
import Auth from '../auth/Auth'

const Navbar = () => {
    const { roomInfo, authInfo } = useSelector((state) => state.auth)

    return (
        <>
            {/* navbar if game = true */}
            {!roomInfo?.game && (
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

                    {authInfo && (
                        <div style={{ marginTop: '30px' }}>
                            {authInfo?.userId}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Navbar
