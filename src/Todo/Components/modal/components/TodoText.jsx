import React from 'react'
import { Box, Text, Stack, Textarea } from '@chakra-ui/react';

const TodoText = (props) => {


    return (
        <Textarea
            {...props}
            minH={'300px'}
            maxH={'300px'}
            pt={4}
            px={4}
            placeholder='Write todos here...'
            size='md'
            border={'none'}
            bgColor="gray.100"
        />
    )
}

export default TodoText