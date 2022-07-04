import { Stack, Text } from '@chakra-ui/react'

import React from 'react'

const HeaderList = ({ title = '' }) => {
    return (
        <Stack direction={'row'} bgColor={'gray.300'} justifyContent="space-between" alignItems="center" borderRadius={3} py={3} px={2}>
            <Text fontWeight={600}>{title}</Text>
            <Text bgColor={'blackAlpha.900'} borderRadius={'md'} color={'white'} px={2}>3</Text>
        </Stack>
    )
}

export default HeaderList
