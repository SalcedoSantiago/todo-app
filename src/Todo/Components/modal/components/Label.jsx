import React from 'react';
import { Box, Text, Stack, Badge, Input, Select, Button, Avatar } from '@chakra-ui/react';

const Label = () => {
    return (
        <Stack direction={'row'} alignItems={'center'} py={2} spacing={6}>
            <Text fontSize={'md'} color={'gray.500'}>Label</Text>

            <Stack direction='row' alignItems={'center'}>
                <Badge>Default</Badge>
                <Badge colorScheme='green'>Success</Badge>
                <Badge colorScheme='red'>Removed</Badge>
            </Stack>
        </Stack>
    )
}

export default Label
