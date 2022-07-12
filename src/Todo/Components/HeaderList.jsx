import { Stack, Text } from '@chakra-ui/react'

import React from 'react'

const HeaderList = ({ title = '', count = 0 }) => {
    return (
        <Stack direction={'row'} bgColor={'green.200'} justifyContent="space-between" alignItems="center" borderRadius={3} py={3} px={3}>
            <Text fontWeight={600} textTransform={'capitalize'}>{title}</Text>
            <Text bgColor={'blackAlpha.900'} borderRadius={'md'} color={'white'} px={2}>{count}</Text>
        </Stack>
    )
}

export default HeaderList
