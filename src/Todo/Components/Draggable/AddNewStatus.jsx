import React, { useState, useRef } from 'react'
import { useTodos } from '../../hooks';
import { Box, Text, Divider, Heading, Stack, Input, Select, Button } from '@chakra-ui/react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';

const AddNewStatus = () => {
    const ref = useRef();
    const { addStatus } = useTodos()
    const [isCreate, setIsCreate] = useState(false)
    const [text, setText] = useState('')

    const handleCreate = () => setIsCreate((prev) => !prev);


    return (
        <Stack direction={'column'} className={"rounded bg-gray-200 p-2"} pt={5} minH={'60vh'} cursor="pointer">
            <Stack
                ref={ref}
                // onClick={handleCreate}
                direction={'row'}
                borderWidth="2px"
                borderColor={'black'}
                borderStyle={'dashed'}
                justifyContent="center"
                alignItems="center"
                borderRadius={3}
                py={!isCreate ? 3 : 2}
                px={3}
            >
                {isCreate ?
                    <Stack direction={"row"}>
                        <Input
                            fontWeight={600}
                            fontSize="sm"
                            placeholder={'title here...'}
                            variant="unstyled"
                            w={'150px'}
                            py={2}
                            px={2}
                            value={text}
                            onInput={({ target: { value } }) => { setText(value) }}
                        />
                        <Stack direction={'row'} alignItems={'center'}>
                            <Button
                                onClick={() => {
                                    setIsCreate(prev => !prev);
                                    setText('');
                                }}
                                size="xs"
                            // colorScheme='red'
                            >
                                <CloseIcon
                                    fontSize={'xs'}
                                />
                            </Button>
                            <Button
                                onClick={() => {
                                    addStatus(text)
                                    setText('');
                                    setIsCreate(!isCreate);
                                }}
                                // colorScheme="green"
                                size="xs"
                            >
                                <CheckIcon
                                    fontSize={'xs'}
                                />
                            </Button>
                        </Stack>
                    </Stack>
                    :
                    <Text
                        onClick={handleCreate}
                        fontWeight={600}
                        textAlign="center"
                        textTransform={'capitalize'}
                    >Add + </Text>
                }
            </Stack>
            {/* </div> */}
            <Stack direction={'column'} w="250px">

            </Stack>
        </Stack>
    )
}

export default AddNewStatus