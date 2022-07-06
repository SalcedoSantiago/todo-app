/**
 * External dependencies
 */
import { Stack, Box } from '@chakra-ui/react'
import { map } from 'lodash';
import { useTodos } from '../hooks';
/**
 * Internal dependencies
 */
import AddTodo from './Add';
import CardTodo from './Card';
import HeaderList from './HeaderList';
import Modal from '../Components/Modal';

const ListTodos = ({ todo, setTypeTodo }) => {
    const { toggleModal, isOpen } = useTodos();
    const { title, items, type } = todo;


    return (
        <Box width={'250px'} height={'100%'} >
            <Stack direction={'column'} gap={4} h={'100%'} py={4}>
                <HeaderList title={title} />
                <Stack direction={'column'} h={'100%'} maxH={'100%'} overflowY="scroll">
                    {items.map((todo, index) => {
                        return (
                            <CardTodo
                                key={index}
                                todo={todo}
                                type={type}
                            />
                        )
                    }
                    )}
                </Stack>
            </Stack>
            <AddTodo onClick={() => {
                setTypeTodo(type)
                toggleModal(true)
            }} />
        </Box>
    )
}

export default ListTodos