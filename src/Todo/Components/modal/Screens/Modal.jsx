import React from 'react'
import CurrentTodo from './CurrentTodo'
import NewTodo from './NewTodo'

const Modal = (props) => {

    if (!!props?.current) {
        <CurrentTodo />
    }

    return (
        <NewTodo {...props} />
    )
}

export default Modal