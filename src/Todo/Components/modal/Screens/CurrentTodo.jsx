/**
 * External dependencies
 */
import React, { useRef, useEffect, useState } from 'react'
import { Box, Text, Spinner, Textarea, Stack, Badge, Input, Select, Button } from '@chakra-ui/react';
import { CirclePicker } from "react-color";
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

/**
 * Internal dependencies
 */
import ModalContainer from '../components/container';
import { useTodos } from '../../../hooks';
import { map } from 'lodash';
import DueDate from '../components/DueDate';

const CurrentTodo = ({ isOpen, toggleModal, id }) => {
    const { updateTodo, status, flattenTodos } = useTodos();
    const ref = useRef()
    const currTodo = flattenTodos.filter((todo) => todo.id == id)[0];
    const [currentTodo, setCurrentTodo] = useState(currTodo);


    useEffect(() => {
        new Picker({ data, ref })
    }, [])

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
            <Input variant='unstyled' value={currentTodo.title} onInput={({ target: { value } }) => { handleUpdate(value, 'title') }} />
            <Box>
                <Stack direction={'row'} alignItems={'center'}>
                    <Text>Status</Text>
                    <Select
                        value={currentTodo.status}
                        onChange={({ target: { value } }) => { handleUpdate(value, 'status') }}
                    >
                        {map(status, ({ name }, index) =>
                            <option key={name} value={name}>{name}</option>
                        )}
                    </Select>
                </Stack>
                {/* <div ref={ref} /> */}
                <DueDate
                    date={currentTodo.date}
                />
                <Box>
                    <Text>To do</Text>
                    <Textarea
                        value={currentTodo.description}
                        onChange={({ target: { value } }) => { handleUpdate(value, 'description') }}
                        placeholder='Here is a sample placeholder'
                        size='sm'
                    />
                </Box>
                <CirclePicker
                    color={currentTodo.color}
                    colors={
                        ["#fff", "#03a9f4", "#009688", "#ffeb3b", "#ff9800", "#795548", "#607d8b"]
                    }
                    onChange={({ hex }) => {
                        handleUpdate(hex, 'color')
                    }}
                />
            </Box>
            <Stack direction="row" justifyContent={'end'}>
                <Button colorScheme='blue' mr={3} onClick={handleCancel}>
                    Close
                </Button>
                <Button colorScheme={'green'} onClick={handleOnSave}>
                    Save
                </Button>
            </Stack>
        </ModalContainer >
    )
}

export default CurrentTodo