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
        }
    } = useContext(TodoContext);


    return {
        setTodos,
        todos,
        status,
        addTodo,
        isOpen,
        toggleModal,
        deleteTodo,
        updateTodo,
        setStatusItems,
        statusItems,
    }
}
