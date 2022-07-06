import React, { useRef, useState } from 'react'
import {
    Modal as ModalContainer,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Button,
    ModalCloseButton,
    Input,
    Flex,
    Box,
    Stack,
    Text,
    Badge,
    Textarea
} from '@chakra-ui/react';

/**
 * Internal dependencies
 */
import { useTodos } from '../hooks';


const Modal = ({ type = '' }) => {
    const [desc, setDesc] = useState('');
    const [title, setTitle] = useState('');
    const { isOpen, toggleModal, addTodo } = useTodos();
    const finalRef = useRef(null)


    return (
        <ModalContainer finalFocusRef={finalRef} isCentered isOpen={isOpen} onClose={() => { toggleModal(false) }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex alignItems={'center'}>
                        <Box w={'50%'}>
                            <Input
                                fontSize={'xl'}
                                placeholder='Titulo...'
                                size='md'
                                value={title}
                                onInput={({ target: { value } }) => { setTitle(value) }}
                                variant='flushed'
                            />
                        </Box>
                        <Flex justifyContent={'center'} alignItems={'center'}>
                            <ModalCloseButton />
                        </Flex>
                    </Flex>
                </ModalHeader>
                <ModalBody>
                    <Box>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Text>Status</Text>
                            <Text>Progress</Text>
                        </Stack>

                        <Stack direction={'row'} alignItems={'center'}>
                            <Text>Due Date</Text>
                            <Text>Feb 17, 2022</Text>
                        </Stack>

                        <Stack direction={'row'} alignItems={'center'}>
                            <Text>Label</Text>
                            <Badge>Feedback</Badge>
                        </Stack>
                        <Box>
                            <Text>To do</Text>
                            <Textarea
                                value={desc}
                                onChange={({ target: { value } }) => { setDesc(value) }}
                                placeholder='Here is a sample placeholder'
                                size='sm'
                            />
                        </Box>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => { toggleModal(false) }}>
                        Close
                    </Button>
                    <Button colorScheme={'green'} onClick={() => {
                        addTodo(type, {
                            title: title,
                            description: desc
                        })
                    }} >Save</Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    )
}

export default Modal