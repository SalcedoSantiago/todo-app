import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Button,
    Stack,
    Flex,
} from '@chakra-ui/react';

import { BsThreeDotsVertical, BsChatSquareQuote, BsFillTrashFill } from 'react-icons/bs';
import { RiShutDownLine, RiFileShredLine } from 'react-icons/ri';
import { useTodos } from '../hooks';

const CardActions = ({ todo, type }) => {
    const { deleteTodo } = useTodos();

    const handleDelete = () => {
        deleteTodo(type, todo)
    }

    return (
        <Flex justifyContent="center" mt={4}>
            <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                    <IconButton
                        aria-label="More server options"
                        icon={<BsThreeDotsVertical />}
                        variant="solid"
                        w="fit-content"
                    />
                </PopoverTrigger>
                <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverBody>
                        <Stack>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<BsChatSquareQuote />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                fontSize="sm">
                                Request Access
                            </Button>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<RiFileShredLine />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                fontSize="sm">
                                Purge Redis Cache
                            </Button>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<BsFillTrashFill />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                colorScheme="red"
                                fontSize="sm"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
}

export default CardActions