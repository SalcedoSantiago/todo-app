/**
 * External dependencies
 */
import React, { useState } from 'react'
import { Box, Text, Heading, Textarea, Stack, Badge, Input, Select, Button, Divider } from '@chakra-ui/react';
import { CirclePicker } from "react-color";
/**
 * Internal dependencies
 */
import ModalContainer from '../components/container';
import { useTodos } from '../../../hooks';
import { map } from 'lodash';
import Actions from '../components/Actions';
import HeadingTodo from '../components/HeadingTodo';
import DueDate from '../components/DueDate';
import StatusPicker from '../components/StatusPicker';
import Label from '../components/Label';
import TodoText from '../components/TodoText';
import ColorPicker from '../components/ColorPicker';
import Assign from '../components/Assign';

const NewTodo = () => {
    const { addTodo, toggleModal, isOpen } = useTodos();
    const todoDefault = {
        title: 'TITLE EXAMPLE',
        status: 'todo',
        color: '#fff',
        description: '',
        activity: '',
    }
    const [currentTodo, setCurrentTodo] = useState(todoDefault)
    const handleAddTodo = () => {
        addTodo(currentTodo);
        setCurrentTodo(todoDefault);
        toggleModal(false);
    }

    const handleUpdate = (value, key) => {
        setCurrentTodo((prev) => { return { ...prev, [key]: value } })
    };

    const handleCancel = () => {
        setCurrentTodo(todoDefault);
        toggleModal(false);
    }

    return (
        <ModalContainer toggleModal={toggleModal} isOpen={isOpen}>
            <HeadingTodo
                value={currentTodo.title}
                onChange={handleUpdate}
            />
            <Box>
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
            </Box>
            <ColorPicker
                value={currentTodo.color}
                onChange={handleUpdate}
            />
            <Actions
                onCancel={handleCancel}
                onSave={handleAddTodo}
            />
        </ModalContainer>
    )
}

export default NewTodo