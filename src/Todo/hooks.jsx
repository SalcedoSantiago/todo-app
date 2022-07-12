import { useContext } from 'react';
import { TodoContext } from './context.jsx';


export function useTodos() {

    const {
        state: {
            todos,
            isOpen,
            status,
            statusItems,
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo,
            setStatusItems,
            setTodos,
            addStatus,
        }
    } = useContext(TodoContext);


    return {
        setTodos,
        todos,
        status,
        addStatus,
        addTodo,
        isOpen,
        toggleModal,
        deleteTodo,
        updateTodo,
        setStatusItems,
        statusItems,
    }
}
