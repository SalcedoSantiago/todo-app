/**
 * External dependencies
 */

import { useState } from 'react';
import { map } from 'lodash';
import { Stack, Box, Heading, Text, IconButton } from '@chakra-ui/react'

/**
 * Internal dependencies
 */
import ListTodos from '../Components/List';
import Modal from '../Components/Modal';
import { useTodos } from '../hooks';

const Body = () => {
    const { todos } = useTodos();

    console.log('todos',todos);


    return (
        <Box h={'100%'} py={4}>
            <Heading pb={3}>Daily Task</Heading>
            <Text>Click +New to create list and wait for project manager card.</Text>
            <Text>Don't create a card by yourself to manage a good colaboration.</Text>
            <Stack
                py={5}
                direction="row"
                flex={1}
                alignItems="start"
                gap={4}
                h="70vh"
            >
                {map(todos, (todo, index) =>
                    <>
                        <ListTodos key={index} todo={todo} taskId={index} />
                    </>
                )
                }
            </Stack>
            <Modal />
        </Box>
    )
}

export default Body