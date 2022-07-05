import React from 'react'
import { Stack, Box, Heading, Text, IconButton } from '@chakra-ui/react'
import { BiDotsHorizontalRounded } from 'react-icons/bi';


const Card = ({ task = "", title = "" }) => {

    return (
        <Box
            px={3}
            py={4}
            borderRadius={'md'}
            bgColor={''}
            cursor={'pointer'}
            borderWidth={2}
            borderColor={'gray.400'}
            borderStyle="dashed"

        >
            <Stack pb={2} direction={'row'} justifyContent={'space-between'} alignItems="center">
                <Text
                    px={2}
                    fontWeight={600}
                >
                    {title}
                </Text>
                <Text>
                    <IconButton
                        aria-label="More server options"
                        icon={<BiDotsHorizontalRounded color='black' />}
                        colorScheme=''
                        w="fit-content"
                        h={'auto'}
                    />
                </Text>
            </Stack>
            <Box px={2} >
                <Text>
                    {task}
                </Text>
            </Box>
        </Box>
    )
}

export default Card