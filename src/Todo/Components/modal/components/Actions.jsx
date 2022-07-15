import { noop } from 'lodash'
import React from 'react'
import { Box, Text, Divider, Stack, Input, Select, Button } from '@chakra-ui/react';

const Actions = ({ onCancel = noop, onSave = noop }) => {
    return (
        <Stack direction="row" justifyContent={'end'} mt={6}>
            <Button colorScheme='red' mr={1} onClick={onCancel}>
                Cancel
            </Button>
            <Button colorScheme={'green'} onClick={onSave}>
                Save
            </Button>
        </Stack>

    )
}

export default Actions