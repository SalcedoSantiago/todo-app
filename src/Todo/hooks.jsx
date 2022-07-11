import { useContext } from 'react';
import { TodoContext } from './context.jsx';


export function useTodos() {

    const {
        state: {
            todos,
            isOpen,
            status,
            flattenTodos,
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
        todos,
        filterStatus,
        status,
        addTodo,
        flattenTodos,
        isOpen,
        toggleModal,
        deleteTodo,
        updateTodo,
        reOrderTodos,
        filterStatus,
        setStatusItems,
        statusItems,
    }
}
