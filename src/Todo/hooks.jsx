import { useContext } from 'react';
import { TodoContext } from './context.jsx';


export function useTodos() {

    const {
        state: {
            todos,
            isOpen,
            status,
            flattenTodos,
            filterStatus
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo,
            reOrderTodos,
            setTodos
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
        reOrderTodos
    }
}
