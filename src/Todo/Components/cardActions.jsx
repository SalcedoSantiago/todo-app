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

const CardActions = ({ name }) => {

    const { deleteStatus, statusToLeft } = useTodos();

    const handleDelete = () => {
        deleteStatus(name);
    }

    const moveToLeft = () => {
        statusToLeft(name);
    }


    return (
        <Flex justifyContent="center" color="black">
            <Popover placement="top" isLazy>
                <PopoverTrigger>
                    <IconButton
                        aria-label="More server options"
                        icon={<BsThreeDotsVertical
                        />}
                        size='xsm'
                        fontSize="sm"
                        variant="green"
                    // w="fit-content"
                    />
                    {/* <BsThreeDotsVertical /> */}
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
                            // onClick={handleEdit}
                            >
                                Edit
                            </Button>

                            <Stack direction={'row'} alignItems="row">
                                <Button
                                    w="50%"
                                    variant="ghost"
                                    rightIcon={<RiFileShredLine />}
                                    justifyContent="space-between"
                                    fontWeight="normal"
                                    fontSize="sm"
                                    onClick={moveToLeft}
                                >
                                    Left
                                </Button>
                                <Button
                                    w="50%"
                                    variant="ghost"
                                    rightIcon={<RiFileShredLine />}
                                    justifyContent="space-between"
                                    fontWeight="normal"
                                    fontSize="sm"
                                // onClick={handleDuplicate}
                                >
                                    Right
                                </Button>
                            </Stack>
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