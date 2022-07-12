/**
 * External dependencies
 */
import React, { useState } from 'react'
import { Box, Text, Divider, Stack, Input, Select, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
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
            {/* <Input variant='unstyled' value={currentTodo.title} onInput={({ target: { value } }) => { handleUpdate(value, 'title') }} /> */}

            <HeadingTodo
                currentTodo={currentTodo}
            />

            <Box>
                <Stack direction={'row'} alignItems={'center'} py={2} spacing={10}>
                    <Text fontSize={'md'} color={'gray.500'}>Status</Text>
                    <Select
                        variant='unstyled'
                        value={currentTodo.status}
                        w="auto"
                        onChange={({ target: { value } }) => { handleUpdate(value, 'status') }}
                    >
                        {map(status, ({ name }, index) =>
                            <option key={name} value={name}>{name}</option>
                        )}
                    </Select>
                </Stack>
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
                />
                <Divider py={2} colorScheme="gray" />
                <TodoText
                    title={'Activity'}
                />
            </Box>
            <Stack direction="row" justifyContent={'end'} pt={10} alignItems='center'>
                <ColorPicker
                />
                <Stack direction="row" justifyContent={'end'} mt={6}>
                    <Button colorScheme='blue' mr={3} onClick={handleCancel}>
                        Close
                    </Button>
                    <Button colorScheme={'green'} onClick={handleOnSave}>
                        Save
                    </Button>
                </Stack>

            </Stack>
        </ModalContainer >
    )
}

export default CurrentTodo