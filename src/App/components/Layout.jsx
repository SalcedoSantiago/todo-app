
import { Stack, Box, Heading, Text, IconButton } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';

const Layout = ({ children }) => {
    return (
        <Stack direction={'row'} px={5} py={10} flex={1} h={'100vh'} maxH="100%">
            <Box w={'25%'}>
                aside
            </Box>
            <Box w={'100%'} h={'100%'}>
                {children}
            </Box>
        </Stack>
    )
}

export default Layout
