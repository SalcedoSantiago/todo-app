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
    useDisclosure
} from '@chakra-ui/react';

import { BsThreeDotsVertical, BsChatSquareQuote, BsFillTrashFill } from 'react-icons/bs';
import { RiFileShredLine } from 'react-icons/ri';
import { useTodos } from '../hooks';

const CardActions = ({ forwardRef, todo, setCurrentTodo, setOpenModal }) => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { deleteTodo, addTodo } = useTodos();

    const handleDelete = () => {
        deleteTodo(todo);
        onClose(!isOpen)
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setCurrentTodo(todo);
        setOpenModal(true);
        onClose(!isOpen)
    }


    const handleDuplicate = (e) => {
        e.preventDefault();
        addTodo(todo);
        onClose(!isOpen)
    }

    return (
        <Flex justifyContent="center" ref={forwardRef}>
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
                                fontSize="sm"
                                onClick={handleEdit}
                            >
                                Edit
                            </Button>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<RiFileShredLine />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                fontSize="sm"
                                onClick={handleDuplicate}
                            >
                                Duplicate
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