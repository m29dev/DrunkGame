/* eslint-disable no-unused-vars */
import { Button } from 'react-bootstrap'
import './dice.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRoomInfo } from '../../redux/authSlice'
import { useOutletContext } from 'react-router-dom'
import { FaArrowAltCircleRight } from 'react-icons/fa'

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
                <Button
                    variant="dark"
                    className="btn-control-panel"
                    onClick={rollTheDice}
                >
                    Rzuć Kostką
                    <FaArrowAltCircleRight className="btn-arrow"></FaArrowAltCircleRight>
                </Button>
            )}
        </>
    )
}

export default DiceRoll
