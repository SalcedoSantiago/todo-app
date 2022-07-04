import React from 'react'
import Layout from '../components/Layout'
import { Stack, Box, Heading, Text, IconButton } from '@chakra-ui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Body from '../../Todo/screens/Body';


const App = () => {

    return (
        <Layout>
            <Body />
        </Layout>
    )
}

export default App