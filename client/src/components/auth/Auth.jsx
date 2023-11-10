import { useCallback, useState } from 'react'
import { useUserConnectMutation } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { setAuthInfo } from '../../redux/authSlice'
import { Button } from 'react-bootstrap'

const Auth = () => {
    const [nickname, setNickname] = useState('')
    const dispatch = useDispatch()

    const [userConnect] = useUserConnectMutation()
    const onConnect = useCallback(
        async (e) => {
            try {
                e.preventDefault()
                if (nickname === (null || ''))
                    return window.alert('nickname value cannot be empty')
                const res = await userConnect(nickname).unwrap()
                const authObject = {
                    _id: res._id,
                    userId: res.userId,
                }
                dispatch(setAuthInfo(authObject))
            } catch (err) {
                console.log(err)
            }
        },
        [userConnect, nickname, dispatch]
    )

    return (
        <>
            <div>
                <form className="form-container" onSubmit={onConnect}>
                    <input
                        className="form-container-input"
                        type="text"
                        placeholder="set a nickname..."
                        onChange={(e) => {
                            setNickname(e?.target?.value)
                        }}
                        value={nickname}
                    />

                    <Button
                        variant="dark"
                        onClick={onConnect}
                        className="form-container-btn"
                    >
                        Connect
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Auth
