import React from 'react'
import { Stack, Text } from '@chakra-ui/react';


const DueDate = ({ date = "Yesterday" }) => {

    return (
        <Stack direction={'row'} alignItems={'center'} py={2} spacing={6}>
            <Text fontSize={'md'} color={'gray.500'}>Due Date</Text>
            <Text fontSize={'md'} fontWeight={500} color="blackAlpha.900">{date}</Text>
        </Stack>
    )
}

export default DueDate