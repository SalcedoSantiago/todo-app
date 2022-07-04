/**
 * External dependencies
 */
import { Stack, Box, Heading, Text, IconButton } from '@chakra-ui/react'
import { map } from 'lodash';

/**
 * Internal dependencies
 */
import AddTodo from './Add';
import CardTodo from './Card';
import HeaderList from './HeaderList';

const ListTodos = ({ todo }) => {

    const { title, items } = todo;

    return (
        <Box width={'250px'} height={'100%'} >
            <Stack direction={'column'} gap={4} h={'100%'}>
                <HeaderList title={title} />
                {map(items, ({ description, title }, index) =>
                    <CardTodo
                        key={index}
                        task={description}
                        title={title}
                    />
                )}
            </Stack>

            <AddTodo onClick={() => { console.log('todo', todo); }} />
        </Box>
    )
}

export default ListTodos