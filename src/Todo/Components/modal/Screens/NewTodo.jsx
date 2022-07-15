/**
 * External dependencies
 */
import React, { useState } from 'react'
import { Box, Text, Heading, Textarea, Stack, Badge, Input, Select, Button, Divider, RadioGroup, Radio } from '@chakra-ui/react';
import {
    BsCardText,
    BsCardChecklist
} from "react-icons/bs";
/**
 * Internal dependencies
 */
import ModalContainer from '../components/container';
import { useTodos } from '../../../hooks';
import Actions from '../components/Actions';
import HeadingTodo from '../components/HeadingTodo';
import StatusPicker from '../components/StatusPicker';
import TodoText from '../components/TodoText';
import ColorPicker from '../components/ColorPicker';
// import Assign from '../components/Assign';
import Task from '../components/Task';
import EmergencyPicker from '../components/EmergencyPicker';

const NewTodo = () => {
    const { addTodo, toggleModal, isOpen } = useTodos();

    const todoDefault = {
        title: 'TITLE EXAMPLE',
        status: 'todo',
        color: '#fff',
        description: '',
        priority: 'low',
        type: 'text',
        tasks: []
    }


    const [currentTodo, setCurrentTodo] = useState(todoDefault)
    const handleAddTodo = () => {
        let TODO = currentTodo;

        if (TODO.type == 'text') {
            delete TODO.tasks;
        } else {
            delete TODO.description;
        }

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
                    <Stack direction={'row'} alignItems='center' justifyContent={'space-between'} pb={5}>
                        <Heading fontWeight={600} py={2} fontSize='xl'>Todo</Heading>
                        <Stack direction={'row'} alignItems='center' >
                            <Box cursor="pointer" onClick={() => { handleUpdate('text', 'type') }} py={1} bgColor={currentTodo.type == 'text' ? 'blue.500' : 'white'} px={2} rounded="md">
                                <BsCardText style={{ fontSize: '22px', color: currentTodo.type == 'text' ? 'white' : 'black' }} />
                            </Box>
                            <Box cursor="pointer" onClick={() => { handleUpdate('list', 'type') }} py={1} bgColor={currentTodo.type == 'list' ? 'blue.500' : 'white'} px={2} rounded="md">
                                <BsCardChecklist style={{ fontSize: '22px', color: currentTodo.type == 'list' ? 'white' : 'black' }} />
                            </Box>
                        </Stack>
                    </Stack>
                    {currentTodo.type == 'text' ?
                        <TodoText
                            value={currentTodo.description}
                            onChange={({ target: { value } }) => { handleUpdate(value, 'description') }}
                        />
                        :
                        <Task
                            value={currentTodo?.tasks}
                            setCurrentTodo={setCurrentTodo}
                        />
                    }
                    <Divider py={2} colorScheme="gray" />
                </Box>
            </Box>
            <Stack direction="row" alignItems={'center'}>
                <ColorPicker
                    value={currentTodo.color}
                    onChange={handleUpdate}
                />
                <Actions
                    onCancel={handleCancel}
                    onSave={handleAddTodo}
                />
            </Stack>
        </ModalContainer>
    )
}

export default NewTodo;                                              