import React from 'react'
import { Box, Text, Stack, Textarea } from '@chakra-ui/react';

const TodoText = (props) => {


    return (
        <Box pt={6}>
            <Text fontWeight={600} py={2}>{props.title}</Text>
            <Textarea
                {...props}
                pt={3}
                placeholder='Here is a sample placeholder'
                size='sm'
                border={'none'}
            />
        </Box>

    )
}

export default TodoText