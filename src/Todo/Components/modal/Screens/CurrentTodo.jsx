/**
 * External dependencies
 */
import React, { useState } from 'react'
import { Box, Divider, Stack, } from '@chakra-ui/react';

/**
 * Internal dependencies
 */
import ModalContainer from '../components/container';
import { useTodos } from '../../../hooks';
import { map } from 'lodash';
import TodoText from '../components/TodoText';
import ColorPicker from '../components/ColorPicker';
import HeadingTodo from '../components/HeadingTodo';
import StatusPicker from '../components/StatusPicker';
import Actions from '../components/Actions';
import Task from '../components/Task';
import EmergencyPicker from '../components/EmergencyPicker';

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
            <Divider colorScheme="gray" />

            <Box py={6}>
                <StatusPicker
                    value={currentTodo.status}
                    onChange={({ target: { value } }) => { handleUpdate(value, 'status') }}
                />
                <EmergencyPicker
                    onChange={({ target: { value } }) => { handleUpdate(value, 'priority') }}
                    value={currentTodo.priority}
                />
                <Divider py={2}
                    colorScheme="gray"
                />
                <Box pt={6}>
                    {currentTodo?.type == 'list' ?
                        <Task
                            value={currentTodo.tasks}
                            setCurrentTodo={setCurrentTodo}
                        /> :
                        <TodoText
                            value={currentTodo.description}
                            onChange={({ target: { value } }) => { handleUpdate(value, 'description') }}
                        />
                    }
                    <Divider py={2} colorScheme="gray" />
                </Box>
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