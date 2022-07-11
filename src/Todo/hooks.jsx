import { useContext } from 'react';
import { TodoContext } from './context.jsx';


export function useTodos() {

    const {
        state: {
            todos,
            isOpen,
            allTodos,
            status,
            todos_,
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
        todos_,
        addTodo,
        allTodos,
        status,
        isOpen,
        toggleModal,
        deleteTodo,
        updateTodo,
        reOrderTodos
    }
}
