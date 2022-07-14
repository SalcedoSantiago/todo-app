import React, { useState } from 'react';
import { Box, Text, Stack, Badge, Input, Select, Button, Avatar } from '@chakra-ui/react';

const Label = () => {
    const [text, setText] = useState('');
    const handleInput = (e) => {
        if (e.key == 'Enter') return
        const { target: { value } } = e;
        setText(value)

    }


    return (
        <Stack direction={'row'} alignItems={'center'} py={2} spacing={6}>
            <Text fontSize={'md'} color={'gray.500'}>Label</Text>
            <Stack direction={'row'} alignItems='center'>
                <Badge>Default</Badge>
                <Badge colorScheme='green'>Success</Badge>
                <Badge colorScheme='red'>Removed</Badge>
                <Input
                    w={'100px'}
                    size='sm'
                    value={text}
                    onInput={handleInput}
                    placeholder='enter a tag'
                />
            </Stack>
        </Stack>
    )
}

export default Label
