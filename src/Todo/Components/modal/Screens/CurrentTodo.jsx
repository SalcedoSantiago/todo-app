/**
 * External dependencies
 */
import React, { useState, useEffect } from 'react'
import { Box, Text, Spinner, Textarea, Stack, Badge, Input, Select, Button } from '@chakra-ui/react';
import { CirclePicker } from "react-color";

/**
 * Internal dependencies
 */
import ModalContainer from '../components/container';
import { useTodos } from '../../../hooks';
import { map } from 'lodash';
import DueDate from '../components/DueDate';

const CurrentTodo = ({ isOpen, toggleModal, currentTodo, setCurrentTodo }) => {
    const { todos, updateTodo, status } = useTodos();
    // const [blockPickerColor, setBlockPickerColor] = useState(currentTodo?.color ? currentTodo.color : "#37d67a");

    useEffect(() => {

    }, [currentTodo])


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
        updateTodo(currentTodo);
        toggleModal(false)
    }

    const handleCancel = () => {
        setCurrentTodo({});
        toggleModal(false)
    }

    return (
        <ModalContainer toggleModal={toggleModal} isOpen={isOpen} onSave={handleOnSave}  >
            <Input variant='unstyled' value={currentTodo.title} onInput={handleAddTitle} />
            <Box>
                <Stack direction={'row'} alignItems={'center'}>
                    <Text>Status</Text>
                    <Select value={currentTodo.status} onChange={handleChangeStatus}>
                        {map(status, ({ name }, index) =>
                            <option key={name} value={name}>{name}</option>
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
                <CirclePicker
                    color={currentTodo.color}
                    colors={
                        ["#fff", "#03a9f4", "#009688", "#ffeb3b", "#ff9800", "#795548", "#607d8b"]
                    }
                    onChange={(color) => {
                        setCurrentTodo({ ...currentTodo, color: color.hex });
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