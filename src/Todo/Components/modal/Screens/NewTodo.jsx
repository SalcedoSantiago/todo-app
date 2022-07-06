/**
 * External dependencies
 */
import React, { useState } from 'react'
import { Box, Text, Heading, Textarea, Stack, Badge, Input, Select } from '@chakra-ui/react';

/**
 * Internal dependencies
 */
import ModalContainer from '../components/container';
import { useTodos } from '../../../hooks';
import { map } from 'lodash';

const NewTodo = ({ type }) => {
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const { todos, addTodo, toggleModal } = useTodos();
    const [typeSelected, setTypeSelected] = useState(type);

    const handleAddTodo = () => {
        addTodo(typeSelected, {
            description: desc,
            title: title,
            status: typeSelected ? typeSelected : 'todo'
        });
        toggleModal(false)
    }

    const handleAddDesc = ({ target: { value } }) => {
        setDesc(value);
    }

    const handleAddTitle = ({ target: { value } }) => {
        setTitle(value);
    }

    return (
        <ModalContainer onSave={() => { handleAddTodo() }}>
            <Input value={title} onInput={handleAddTitle} />
            <Box>
                <Stack direction={'row'} alignItems={'center'}>
                    <Text>Status</Text>
                    <Select value={typeSelected} onChange={({ target: { value } }) => { setTypeSelected(value) }}>
                        {map(todos, (todo, index) =>
                            <option key={index} value={todo.type}>{todo.type}</option>
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
        </ModalContainer>
    )
}

export default NewTodo