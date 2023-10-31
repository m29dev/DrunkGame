import TextGradient from '../../components/textGradient/TextGradient'
import Auth from '../../components/auth/Auth'
import './homePage.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
                <TextGradient text={`Booze Game`} size={72}></TextGradient>

                <Auth></Auth>
            </div>
        </>
    )
}

export default HomePage
