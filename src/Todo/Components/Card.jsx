import React, { useRef, useState } from 'react'
import { Stack, Box, Text, Badge, Heading, Avatar } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons';


const Card = ({ todo }) => {
    const optionRef = useRef();

    return (
        <Box
            position="relative"
            px={5}
            py={4}
            mb={4}
            borderRadius={'md'}
            cursor={'pointer'}
            shadow="sm"
            bgColor={todo?.color ? todo.color : 'white'}
            color={todo?.color && todo.color == '#fff' ? '#000' : '#fff' || '#000'}
            onClick={(e) => {
                if (optionRef.current.contains(e.target)) {
                    return;
                }
                setCurrentTodo(todo);
                setOpenModal(true)
            }}
        >
            <Stack pb={2} direction={'column'} alignItems="start">
                <Badge  rounded="4" colorScheme='red'>
                    urgent
                </Badge>
                <Heading
                    fontWeight={500}
                    fontSize={'lg'}
                >
                    {todo?.title ? todo.title : 'Uname'}
                </Heading>
            </Stack>
            <Stack direction={'row'} pt={4} alignItems={'center'}  justifyContent="space-between">
                <Stack direction={'row'} alignItems='center'>
                    <Avatar
                        size='xs'
                        src='https://bit.ly/sage-adebayo'
                    />
                    <Text
                        fontSize='xs'
                    >13-15 Jul</Text>
                </Stack>

                <Stack direction={'row'} alignItems='center'>
                    <EmailIcon />
                    <Text>2</Text>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Card