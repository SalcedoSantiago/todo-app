/**
 * External dependencies
 */
import React from 'react';
import { noop } from 'lodash';
import { Stack, Box } from '@chakra-ui/react';


const Add = (props) => {
    const {
        onClick = noop
    } = props;




    return (
        <Stack
            onClick={onClick}
            w={'100%'}
            justify="center"
            align={'center'}
            py={3}
            borderWidth={2}
            borderStyle={'dashed'}
            borderColor={'gray.300'}
            color={'gray.300'}
            cursor={'pointer'}
            transition={'all 1 ease-out'}
            _hover={{ borderColor: 'gray.600', color: 'gray.600' }}
        >
            <Box fontWeight={500}>
                +
            </Box>
        </Stack>
    )
}

export default Add