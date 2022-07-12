import { Box, Text, Divider, Heading, Stack, Input, Select, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const HeadingTodo = ({ currentTodo }) => {
    return (
        <Stack pb={4} direction="row" >
            <Heading fontWeight={600} flex={1}>
                {currentTodo.title}
            </Heading>
            <Button>
                <EditIcon />
            </Button>
        </Stack>
    )
}

export default HeadingTodo