import React, { useEffect, useRef } from 'react'
import { CirclePicker } from "react-color";
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

const ColorPicker = () => {
    const ref = useRef()

    useEffect(() => {
        new Picker({ data, ref })
    }, [])


    return (
        <CirclePicker
            color={"#fff"}
            width='100%'
            colors={
                ["#fff", "#03a9f4", "#009688", "#ffeb3b", "#ff9800", "#795548", "#607d8b"]
            }
            onChange={({ hex }) => {
                // handleUpdate(hex, 'color')
            }}
        />
    )
}

export default ColorPicker