import React from 'react'
import { Box, Text, Divider, Stack, Input, Select, Button } from '@chakra-ui/react';
import { useTodos } from '../../../hooks';
import { noop, map } from 'lodash';


const StatusPicker = (props) => {
    const {
        status,
    } = useTodos();

    const {
        onChange = noop,
        value = 'todo'
    } = props;

    return (
        <Stack direction={'row'} alignItems={'center'} py={2} spacing={10}>
            <Text fontSize={'md'} color={'gray.500'}>Status</Text>
            <Select
                variant='unstyled'
                w="auto"
                value={value}
                onChange={onChange}
            >
                {map(status, ({ name }) =>
                    <option key={name} value={name}>{name}</option>
                )}
            </Select>
        </Stack>
    )
}

export default StatusPicker