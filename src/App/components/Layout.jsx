
import { Stack, Box, Heading, Text, IconButton, Container, Center, HStack } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';

const Layout = ({ children }) => {
    return (
        <Container h={'100vh'} maxW={'6xl'} py={20} >
            {children}
        </Container>
    )
}

export default Layout
