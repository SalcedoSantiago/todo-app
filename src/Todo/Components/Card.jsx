import React, { useRef, useState } from 'react'
import { Stack, Box, Text, Badge, Heading, Avatar, Button } from '@chakra-ui/react'
import { BsCardChecklist } from "react-icons/bs";
import OutsideClickHandler from 'react-outside-click-handler';


const Card = ({ todo }) => {
    const optionRef = useRef();

    const getColorPriority = () => {
        switch (todo.priority) {
            case 'urgent':
                return 'red'

            case 'low':
                return 'green'
            case 'high':
                return 'orange'
            case 'mid':
                return 'blue'
            default:
                return ''
        }
    }


    return (
        <Box
            position="relative"
            px={6}
            py={4}
            mb={4}
            borderRadius={'md'}
            cursor={'pointer'}
            shadow="md"
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
                <Badge rounded="4" colorScheme={getColorPriority()}>
                    {todo?.priority}
                </Badge>
                <Heading
                    fontWeight={500}
                    fontSize={'lg'}
                >
                    {todo?.title ? todo.title : 'Uname'}
                </Heading>
            </Stack>
            <Stack>
                <Text>{todo?.description || ''}</Text>

            </Stack>
            <Stack direction={'row'} pt={4} alignItems={'center'} justifyContent="end">
                {
                    todo?.tasks && (
                        <Stack direction={'row'} alignItems='center'>
                            <BsCardChecklist />
                            <Text>{todo.tasks.length}</Text>
                        </Stack>
                    )
                }
            </Stack>

            <Button position={'absolute'} top={0} right={0} mr={2} mt={2} onClick={() => { console.log('testing') }}>
                <BsCardChecklist/>
            </Button>
        </Box>
    )
}

export default Card