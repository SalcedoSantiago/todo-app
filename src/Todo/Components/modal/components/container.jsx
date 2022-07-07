import React, { useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
} from '@chakra-ui/react';

/**
 * Internal dependencies
 */
import { useTodos } from '../../../hooks';
import { noop } from 'lodash';

const ModalContainer = ({ onSave = noop, children, isOpen, toggleModal, onCancel = noop }) => {


    const handleCancel = () => {
        onCancel();
        toggleModal(false);
    }

    return (
        <Modal size={'xl'} isCentered isOpen={isOpen} onClose={() => { toggleModal(false) }}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody py={10} px={6}>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleCancel}>
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