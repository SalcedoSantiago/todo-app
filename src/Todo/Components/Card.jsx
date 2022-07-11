import React, { useRef, useState } from 'react'
import { Stack, Box, Text } from '@chakra-ui/react'
import CardActions from './cardActions';
import ModalCurrent from '../Components/modal/Screens/CurrentTodo';

const Card = ({ todo }) => {
    const [openModal, setOpenModal] = useState(false)
    const [currentTodo, setCurrentTodo] = useState({});
    const optionRef = useRef();

    return (
        <Box
            position="relative"
            px={3}
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
            // maxHeight="100px"
        >
            <Stack pb={2} direction={'row'} justifyContent={'space-between'} alignItems="center">
                <Text
                    px={2}
                    fontWeight={600}
                >
                    {todo.title}
                </Text>
                <Box>
                    <CardActions
                        forwardRef={optionRef}
                        todo={todo}
                        setCurrentTodo={setCurrentTodo}
                        setOpenModal={setOpenModal}
                    />
                </Box>
            </Stack>
            <Box px={2} >
                <Text>
                    {todo.description}
                </Text>
            </Box>
            <ModalCurrent isOpen={openModal} toggleModal={setOpenModal} currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} />
        </Box>
    )
}

export default Card