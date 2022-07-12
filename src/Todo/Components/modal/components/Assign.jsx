import { Box, Text, Stack, Badge, Input, Select, Button, Avatar } from '@chakra-ui/react';


const Assign = () => {
    return (
        <Stack direction={'row'} alignItems={'center'} py={2} spacing={6}>
            <Text fontSize={'md'} color={'gray.500'}>Assigne</Text>

            <Stack direction={'row'} alignItems={'center'}>
                <Avatar
                    size='xs'
                    src='https://bit.ly/sage-adebayo'
                />
                <Text>Me</Text>
            </Stack>
        </Stack>
    )
}

export default Assign