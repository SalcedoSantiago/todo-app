/**
 * External dependencies
 */
import React, { useState } from 'react'
import { Box, Text, Divider, Stack, Input, Select, Button } from '@chakra-ui/react';

/**
 * Internal dependencies
 */
import ModalContainer from '../components/container';
import { useTodos } from '../../../hooks';
import { map } from 'lodash';
import DueDate from '../components/DueDate';
import Assign from '../components/Assign';
import Label from '../components/Label';
import TodoText from '../components/TodoText';
import ColorPicker from '../components/ColorPicker';
import HeadingTodo from '../components/HeadingTodo';
import StatusPicker from '../components/StatusPicker';
import Actions from '../components/Actions';

const CurrentTodo = ({ isOpen, toggleModal, id }) => {
    const { updateTodo, status, todos } = useTodos();
    const currTodo = todos.filter((todo) => todo.id == id)[0];
    const [currentTodo, setCurrentTodo] = useState(currTodo);


    const handleOnSave = () => {
        updateTodo(currentTodo);
        toggleModal(false)
    }

    const handleCancel = () => {
        setCurrentTodo({});
        toggleModal(false)
    }

    const handleUpdate = (value, key) => {
        setCurrentTodo((prev) => { return { ...prev, [key]: value } })
    };


    return (
        <ModalContainer toggleModal={toggleModal} isOpen={isOpen} onSave={handleOnSave}  >
            <HeadingTodo
                value={currentTodo.title}
                onChange={handleUpdate}
            />
            <Box>
                <StatusPicker
                    value={currentTodo.status}
                    onChange={({ target: { value } }) => { handleUpdate(value, 'status') }}
                />
                <DueDate
                    date={currentTodo.date}
                />
                <Assign />
                <Label />
                <Divider py={2}
                    colorScheme="gray"
                />
                <TodoText
                    title={'Todo'}
                    value={currentTodo.description}
                    onChange={({ target: { value } }) => { handleUpdate(value, 'description') }}
                />
                <Divider py={2} colorScheme="gray" />
                <TodoText
                    title={'Activity'}
                    value={currentTodo?.activity ? currentTodo.activity : ''}
                    onChange={({ target: { value } }) => { handleUpdate(value, 'activity') }}
                />
            </Box>
            <Stack direction="row" justifyContent={'end'} pt={10} alignItems='center'>
                <ColorPicker
                    value={currentTodo.color}
                    onChange={handleUpdate}
                />
                <Actions
                    onCancel={handleCancel}
                    onSave={handleOnSave}
                />
            </Stack>
        </ModalContainer >
    )
}

export default CurrentTodo