import React, { useEffect, useRef } from 'react'
import { CirclePicker } from "react-color";
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

const ColorPicker = ({ value, onChange }) => {
    const ref = useRef()

    useEffect(() => {
        new Picker({ data, ref })
    }, [])

    return (
        <CirclePicker
            color={value}
            width='100%'
            colors={
                ["#fff", "#03a9f4", "#009688", "#ffeb3b", "#ff9800", "#795548", "#607d8b"]
            }
            onChange={({ hex }) => {
                onChange(hex, 'color')
            }}
        />
    )
}

export default ColorPicker