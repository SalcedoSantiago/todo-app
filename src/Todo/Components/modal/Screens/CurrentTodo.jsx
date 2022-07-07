/**
 * External dependencies
 */
import React, { useState, useEffect } from 'react'
import { Box, Text, Spinner, Textarea, Stack, Badge, Input, Select } from '@chakra-ui/react';

/**
 * Internal dependencies
 */
import ModalContainer from '../components/container';
import { useTodos } from '../../../hooks';
import { map } from 'lodash';
import DueDate from '../components/DueDate';

const CurrentTodo = ({ isOpen, toggleModal, currentTodo, setCurrentTodo }) => {
    const { todos, updateTodo } = useTodos();

    useEffect(() => {

    }, [currentTodo])

    console.log('currentTodo', currentTodo);
    // console.log('todo', todo);

    const handleAddTitle = ({ target: { value } }) => {
        setCurrentTodo({ ...currentTodo, title: value });
    }

    const handleChangeStatus = ({ target: { value } }) => {
        setCurrentTodo({ ...currentTodo, status: value });
    }

    const handleChangeDesc = ({ target: { value } }) => {
        setCurrentTodo({ ...currentTodo, description: value });
    }

    const handleOnSave = () => {
        updateTodo(currentTodo, currentTodo.initStatus);
    }

    return (
        <ModalContainer toggleModal={toggleModal} isOpen={isOpen} onSave={handleOnSave}>

            <Input variant='unstyled' value={currentTodo.title} onInput={handleAddTitle} />
            <Box>
                <Stack direction={'row'} alignItems={'center'}>
                    <Text>Status</Text>
                    <Select value={currentTodo.status} onChange={handleChangeStatus}>
                        {map(todos, (todo, index) =>
                            <option key={index} value={todo.type}>{todo.type}</option>
                        )}
                    </Select>
                </Stack>

                <DueDate
                    date={currentTodo.date}
                />

                <Box>
                    <Text>To do</Text>
                    <Textarea
                        value={currentTodo.description}
                        onChange={handleChangeDesc}
                        placeholder='Here is a sample placeholder'
                        size='sm'
                    />
                </Box>
            </Box>
        </ModalContainer>
    )
}

export default CurrentTodo