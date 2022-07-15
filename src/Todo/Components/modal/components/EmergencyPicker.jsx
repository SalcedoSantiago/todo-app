import React from 'react'
import { Box, Text, Divider, Stack, Input, Select, Button } from '@chakra-ui/react';
import { noop, map } from 'lodash';

const EmergencyPicker = (props) => {
    const priorityList = ['low', 'mid', 'high', 'urgent'];
    const {
        onChange = noop,
        value = 'low'
    } = props;

    return (
        <Stack direction={'row'} alignItems={'center'} py={3} >
            <Text fontSize={'md'} w={'100px'} color={'gray.500'}>Priority</Text>
            <Select
                value={value}
                onChange={onChange}
                fontWeight={600}
                w={'150px'}
            >
                {map(priorityList, (name) =>
                    <option key={name} value={name}>{name}</option>
                )}
            </Select>
        </Stack>
    )

}

export default EmergencyPicker