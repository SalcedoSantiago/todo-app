import React from 'react'
import { Box, Text, Stack, Textarea } from '@chakra-ui/react';

const TodoText = ({ title }) => {
    return (
        <Box pt={6}>
            <Text fontWeight={600} py={2}>{title}</Text>
            <Textarea
                pt={3}
                // value={currentTodo.description}
                // onChange={({ target: { value } }) => { handleUpdate(value, 'description') }}
                placeholder='Here is a sample placeholder'
                size='sm'
                border={'none'}
            />
        </Box>

    )
}

export default TodoText