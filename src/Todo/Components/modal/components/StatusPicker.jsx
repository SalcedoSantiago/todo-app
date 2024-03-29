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
        <Stack direction={'row'} alignItems={'center'} py={3} >
            <Text fontSize={'md'} w={'100px'} color={'gray.500'}>Status</Text>
            <Select
                // variant='unstyled'
                value={value}
                onChange={onChange}
                fontWeight={600}
                w={'150px'}
            // px={2}
            >
                {map(status, ({ name }) =>
                    <option style={{ fontWeight: '500', paddingLeft: '5px' }} key={name} value={name}>{name}</option>
                )}
            </Select>
        </Stack>
    )
}

export default StatusPicker