/**
 * External dependencies
 */
import React, { useState } from 'react'
import { Box, Text, Heading, Textarea, Stack, Badge, Input, Select, Button } from '@chakra-ui/react';
import { CirclePicker } from "react-color";
/**
 * Internal dependencies
 */
import ModalContainer from '../components/container';
import { useTodos } from '../../../hooks';
import { map } from 'lodash';

const NewTodo = ({ type }) => {
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const { todos, addTodo, toggleModal, isOpen, status } = useTodos();
    const [typeSelected, setTypeSelected] = useState('todo');
    const [blockPickerColor, setBlockPickerColor] = useState("#fff");


    const handleAddTodo = () => {
        addTodo({
            description: desc,
            title: title,
            status: typeSelected,
            color: blockPickerColor,
            order: 4
        },
            typeSelected
        );
        setDesc('');
        setTitle('');
        setBlockPickerColor('#fff');
        setTypeSelected('todo');
        toggleModal(false);
    }

    const handleAddDesc = ({ target: { value } }) => {
        setDesc(value);
    }

    const handleAddTitle = ({ target: { value } }) => {
        setTitle(value);
    }

    const handleCancel = () => {
        setDesc('');
        setTitle('');
        setTypeSelected('todo')
        toggleModal(false)
    }

    return (
        <ModalContainer toggleModal={toggleModal} isOpen={isOpen}>
            <Input value={title} onInput={handleAddTitle} />
            <Box>
                <Stack direction={'row'} alignItems={'center'}>
                    <Text>Status</Text>
                    <Select value={typeSelected} onChange={({ target: { value } }) => { setTypeSelected(value) }}>
                        {map(status, ({ name }) =>
                            <option key={name} value={name}>{name}</option>
                        )}
                    </Select>
                </Stack>

                <Stack direction={'row'} alignItems={'center'}>
                    <Text>Due Date</Text>
                    <Text>Feb 17, 2022</Text>
                </Stack>

                <Stack direction={'row'} alignItems={'center'}>
                    <Text>Label</Text>
                    <Badge>Feedback</Badge>
                </Stack>
                <Box>
                    <Text>To do</Text>
                    <Textarea
                        value={desc}
                        onChange={handleAddDesc}
                        placeholder='Here is a sample placeholder'
                        size='sm'
                    />
                </Box>
            </Box>
            <CirclePicker
                color={blockPickerColor}
                colors={
                    ["#fff", "#03a9f4", "#009688", "#ffeb3b", "#ff9800", "#795548", "#607d8b"]
                }
                onChange={(color) => {
                    setBlockPickerColor(color.hex);
                }}
            />
            <Stack direction="row" justifyContent={'end'} py={4}>
                <Button colorScheme='blue' mr={3} onClick={handleCancel}>
                    Close
                </Button>
                <Button colorScheme={'green'} onClick={handleAddTodo}>
                    Save
                </Button>
            </Stack>
        </ModalContainer>
    )
}

export default NewTodo