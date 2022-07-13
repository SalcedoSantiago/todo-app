import React from 'react'
import { Stack, Text } from "@chakra-ui/react";
import { useTodos } from '../../hooks';

const AddNewStatus = () => {
    const { addStatus } = useTodos()

    return (
        <Stack direction={'column'} className={"rounded bg-gray-200 p-2"} pt={5} minH={'60vh'} cursor="pointer">
            <Stack onClick={addStatus} direction={'row'} borderWidth="2px" borderColor={'black'} borderStyle={'dashed'} justifyContent="center" alignItems="center" borderRadius={3} py={3} px={3}>
                <Text fontWeight={600} textAlign="center" textTransform={'capitalize'} >Add + </Text>
            </Stack>
            {/* </div> */}
            <Stack direction={'column'} w="250px">

            </Stack>
        </Stack>
    )
}

export default AddNewStatus