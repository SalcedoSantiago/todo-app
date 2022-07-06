import React, { useRef, useState } from 'react'
import {
    Modal,
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
import { useTodos } from '../../../hooks';

const ModalContainer = ({ onSave, children }) => {
    const { isOpen, toggleModal } = useTodos();
    const finalRef = useRef(null)

    return (
        <Modal finalFocusRef={finalRef} isCentered isOpen={isOpen} onClose={() => { toggleModal(false) }}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => { toggleModal(false) }}>
                        Close
                    </Button>
                    <Button colorScheme={'green'} onClick={onSave}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalContainer