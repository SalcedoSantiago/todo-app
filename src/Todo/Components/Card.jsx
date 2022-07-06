import React from 'react'
import { Stack, Box, Heading, Text, IconButton } from '@chakra-ui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import CardActions from './cardActions';

const Card = ({ todo, type }) => {

    return (
        <Box
            px={3}
            py={4}
            borderRadius={'md'}
            bgColor={''}
            cursor={'pointer'}
            shadow="sm"

        >
            <Stack pb={2} direction={'row'} justifyContent={'space-between'} alignItems="center">
                <Text
                    px={2}
                    fontWeight={600}
                >
                    {todo.title}
                </Text>
                <Text>
                    <CardActions todo={todo} type={type} />
                </Text>
            </Stack>
            <Box px={2} >
                <Text>
                    {todo.desc}
                </Text>
            </Box>
        </Box>
    )
}

export default Card