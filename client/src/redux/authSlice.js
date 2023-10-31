import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authInfo: localStorage.getItem('authInfo')
        ? JSON.parse(localStorage.getItem('authInfo'))
        : null,

    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

    roomInfo: localStorage.getItem('roomInfo')
        ? JSON.parse(localStorage.getItem('roomInfo'))
        : null,

    gameInfo: localStorage.getItem('gameInfo')
        ? JSON.parse(localStorage.getItem('gameInfo'))
        : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // auth information
        setAuthInfo: (state, action) => {
            state.authInfo = action.payload
            localStorage.setItem('authInfo', JSON.stringify(action.payload))
        },
        clearAuthInfo: (state) => {
            state.authInfo = null
            localStorage.removeItem('authInfo')
        },

        // user information
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        clearUserInfo: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        },

        // room information
        setRoomInfo: (state, action) => {
            state.roomInfo = action.payload
            localStorage.setItem('roomInfo', JSON.stringify(action.payload))
        },
        clearRoomInfo: (state) => {
            state.roomInfo = null
            localStorage.removeItem('roomInfo')
        },

        // game information
        setGameInfo: (state, action) => {
            state.gameInfo = action.payload
            localStorage.setItem('gameInfo', JSON.stringify(action.payload))
        },
        clearGameInfo: (state) => {
            state.gameInfo = null
            localStorage.removeItem('gameInfo')
        },
    },
})

export const {
    setAuthInfo,
    cleatAuthInfo,

    setUserInfo,
    clearUserInfo,

    setRoomInfo,
    clearRoomInfo,

    setGameInfo,
    clearGameInfo,
} = authSlice.actions
export default authSlice.reducer
