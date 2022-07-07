import React, { useState } from 'react'
import { Stack, Box, Text } from '@chakra-ui/react'
import CardActions from './cardActions';
import { useTodos } from '../hooks';
import ModalCurrent from '../Components/modal/Screens/CurrentTodo';

const Card = ({ todo, type }) => {
    const [openModal, setOpenModal] = useState(false)
    // const { toggleModal } = useTodos();
    const [currentTodo, setCurrentTodo] = useState({});


    return (
        <Box
            px={3}
            py={4}
            borderRadius={'md'}
            bgColor={''}
            cursor={'pointer'}
            shadow="sm"
            onClick={() => {
                // if (currentTodo?.id == todo.id) {
                //     return
                // }
                setCurrentTodo(todo);
                setOpenModal(true)
            }}
        >
            <Stack pb={2} direction={'row'} justifyContent={'space-between'} alignItems="center">
                <Text
                    px={2}
                    fontWeight={600}
                >
                    {todo.title}
                </Text>
                <Box>
                    <CardActions todo={todo} type={type} />
                </Box>
            </Stack>
            <Box px={2} >
                <Text>
                    {todo.description}
                </Text>
            </Box>
            {/* <Modal type={typeTodo} /> */}

            <ModalCurrent isOpen={openModal} toggleModal={setOpenModal} currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />
        </Box>
    )
}

export default Card