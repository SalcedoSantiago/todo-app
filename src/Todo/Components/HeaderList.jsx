import { Stack, Text } from '@chakra-ui/react'

import React from 'react'
import CardActions from './cardActions';

const STATUS_DEFAULT = ['todo', 'doing', 'done'];

const HeaderList = ({ title = '', count = 0 }) => {

    const isDefault = STATUS_DEFAULT.includes(title);


    return (
        <Stack w="100%" direction={'row'} bgColor={'blue.400'} justifyContent="space-between" alignItems="center" borderRadius={3} py={3} px={3}>
            <Text color={'white'} fontWeight={600} textTransform={'capitalize'}>{title}</Text>
            {!isDefault &&
                <CardActions name={title} />
            }
            <Text bgColor={'blackAlpha.900'} borderRadius={'md'} color={'white'} px={2}>{count}</Text>
        </Stack>
    )
}

export default HeaderList
