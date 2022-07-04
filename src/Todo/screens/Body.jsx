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

const Body = () => {

    const [todos, setTodos] = useState({
        nextUp: {
            title: 'Next Up',
            items: {
                432: {
                    title: '👊',
                    description: 'lorem ipsum'
                },
                435: {
                    title: '🤟',
                    description: 'lorem ipsum'
                },
                4351: {
                    title: '🤟',
                    description: 'lorem ipsum'
                }
            }
        },
        inProgress: {
            title: 'In Progress',
            items: {}
        },
        Complete: {
            title: 'Complete',
            items: {}
        }
    })


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
        </Box>
    )
}

export default Body