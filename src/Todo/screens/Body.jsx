/**
 * External dependencies
 */

import { useState } from 'react';
import { map } from 'lodash';
import { Stack, Box, Heading, Text, Button, Container, Grid, GridItem } from '@chakra-ui/react'

/**
 * Internal dependencies
 */
import { useTodos } from '../hooks';
import NewTodo from '../Components/modal/Screens/NewTodo';
import { MultipleContainers } from "../Components/Draggable/MultipleContainers";

const Body = () => {
    const { toggleModal } = useTodos();
    const [typeTodo, setTypeTodo] = useState('todo');

    return (
        <Box h={'100%'} py={4} >
            <Stack direction={'row'} alignItems='center' justifyContent="space-between" pr={4}>
                <Box pb={4}>
                    <Heading pb={3}>Daily Task</Heading>
                    <Text>Click +New to create list and wait for project manager card.</Text>
                    <Text>Don't create a card by yourself to manage a good colaboration.</Text>
                </Box>
                <Box>
                    <Button
                        onClick={() => { toggleModal(true) }}
                        cursor={'pointer'}
                        colorScheme="blue"
                        transition={'all 1 ease-out'}
                        size='lg'
                        _hover={{ borderColor: 'gray.600', color: 'gray.600' }}
                    >
                        + Add todo
                    </Button>
                </Box>
            </Stack>
            <Stack
                maxH={'78vh'}
            >
                <MultipleContainers />
            </Stack>
            <NewTodo type={typeTodo} />
        </Box>
    )
}

export default Body