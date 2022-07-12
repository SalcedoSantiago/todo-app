import { useContext } from 'react';
import { TodoContext } from './context.jsx';


export function useTodos() {

    const {
        state: {
            todos,
            isOpen,
            status,
            filterStatus,
            statusItems,
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo,
            reOrderTodos,
            setStatusItems,
            setTodos,
        }
    } = useContext(TodoContext);


    return {
        setTodos,
        todos,
        filterStatus,
        status,
        addTodo,
        isOpen,
        toggleModal,
        deleteTodo,
        updateTodo,
        reOrderTodos,
        setStatusItems,
        statusItems,
    }
}
