/* eslint-disable no-unused-vars */
import { Button } from 'react-bootstrap'
import './dice.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRoomInfo } from '../../redux/authSlice'
import { useOutletContext } from 'react-router-dom'

const DiceRoll = () => {
    const { roomInfo } = useSelector((state) => state.auth)
    const [socket] = useOutletContext()
    const dispatch = useDispatch()

    const rollTheDice = () => {
        socket.emit('gameRollTheDice', { room_id: roomInfo?._id })
        // const clone = structuredClone(roomInfo)
        // clone.gameCurrentDice = randomNum
        // dispatch(setRoomInfo(clone))
    }

    return (
        <>
            {!roomInfo?.gameCurrentDice && (
                <Button variant="dark" onClick={rollTheDice}>
                    Roll the Dice
                </Button>
            )}
        </>
    )
}

export default DiceRoll
