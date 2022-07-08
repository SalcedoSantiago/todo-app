/**
 * External dependencies
 */

import { useState } from 'react';
import { map } from 'lodash';
import { Stack, Box, Heading, Text, Button, Container } from '@chakra-ui/react'

/**
 * Internal dependencies
 */
import ListTodos from '../Components/List';
import { useTodos } from '../hooks';
import NewTodo from '../Components/modal/Screens/NewTodo';

const Body = () => {
    const { todos, toggleModal, allTodos } = useTodos();
    const [typeTodo, setTypeTodo] = useState('todo');

    return (
        <Box h={'100%'} py={4}>
            <Stack direction={'row'} justifyContent="space-between" maxW={'800px'}>
                <Box>
                    <Heading pb={3}>Daily Task</Heading>
                    <Text>Click +New to create list and wait for project manager card.</Text>
                    <Text>Don't create a card by yourself to manage a good colaboration.</Text>
                </Box>
                <Box>
                    <Button
                        onClick={() => { toggleModal(true) }}
                        cursor={'pointer'}
                        colorScheme="green"
                        transition={'all 1 ease-out'}
                        _hover={{ borderColor: 'gray.600', color: 'gray.600' }}
                    >
                        new todo
                    </Button>
                </Box>
            </Stack>
            <Stack
                py={5}
                direction="row"
                flex={1}
                alignItems="start"
                gap={4}
                h="70vh"
            >
                {map(allTodos, (todo, index) =>
                    <ListTodos key={index} todo={todo} taskId={index} setTypeTodo={setTypeTodo} />
                )
                }
            </Stack>
            <NewTodo type={typeTodo} />
        </Box>
    )
}

export default Body