/**
 * External dependencies
 */
import { Stack, Box } from '@chakra-ui/react'
import { useTodos } from '../hooks';
// import Draggable from 'react-draggable'; // The default\
// import { useDrag, useDrop } from "react-dnd";
import { useState } from 'react';
import { ReactSortable } from "react-sortablejs";

/**
 * Internal dependencies
 */
import AddTodo from './Add';
import CardTodo from './Card';
import HeaderList from './HeaderList';
// import Modal from '../Components/Modal';

const ListTodos = ({ todo }) => {
    const { reOrderTodos } = useTodos();
    const { title, items, type } = todo;


    return (
        <Box width={'250px'} height={'100%'} >
            <Stack direction={'column'} gap={4} h={'100%'} py={4}>
                <HeaderList title={title} cant={Boolean(items?.length) ? items.length : 0} />
                {/* <Stack direction={'column'} h={'100%'} >
                    {items.map((todo, index) =>
                        <CardTodo
                            key={index}
                            todo={todo}
                        // onDropPlayer={movePlayer}
                        />
                    )}
                </Stack> */}
                <Stack direction={'column'} h={'100%'} position="relative" >
                    <ReactSortable
                        list={items}
                        //  setList={()=>{setState}
                        setList={(newState) => {
                            const newOrder = newState.map((todo, index) => {
                                return {
                                    ...todo,
                                    order: index,
                                    status: type,
                                }
                            }
                            )
                            reOrderTodos(newOrder, todo)
                        }}
                        group="shared-group-name"
                    >
                        {items.map((item) => (
                            <CardTodo
                                key={item.id}
                                todo={item}
                            // onDropPlayer={movePlayer}
                            />
                        ))}
                    </ReactSortable>
                </Stack>
            </Stack>
        </Box >
    )
}

export default ListTodos