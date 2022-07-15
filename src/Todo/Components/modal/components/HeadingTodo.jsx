import { useState } from 'react'
import { Box, Text, Divider, Heading, Stack, Input, Select, Button } from '@chakra-ui/react';
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';


const HeadingTodo = ({ onChange, value }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [text, setText] = useState(value);


    return (
        <Stack pb={4} direction="row" >
            {!isEdit ?
                <Heading m={0} fontWeight={600} flex={1}>
                    {value}
                </Heading>
                :
                <Input
                    fontWeight={600}
                    fontSize="2xl"
                    color={'gray.600'}
                    variant='filled'
                    p={0}
                    value={text}
                    onInput={({ target: { value } }) => { setText(value) }}
                />
            }
            {!isEdit ?
                <Button onClick={() => { setIsEdit(prev => !prev) }} colorScheme="blue" >
                    <EditIcon color={'white'} />
                </Button>
                :
                <Stack direction={'row'} alignItems={'center'}>
                    <Button
                        onClick={() => {
                            setIsEdit(prev => !prev);
                            setText(value);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                    <Button
                        onClick={() => {
                            onChange(text, 'title')
                            setIsEdit(prev => !prev);
                        }}
                    >
                        <CheckIcon />
                    </Button>
                </Stack>
            }
        </Stack>
    )
}

export default HeadingTodo