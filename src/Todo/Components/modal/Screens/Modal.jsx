import React from 'react'
import CurrentTodo from './CurrentTodo'
import NewTodo from './NewTodo'

const Modal = (props) => {

    if (!!props?.current) {
        <CurrentTodo />
    }

    console.log('test');
    return (
        <NewTodo {...props} />
    )
}

export default Modal