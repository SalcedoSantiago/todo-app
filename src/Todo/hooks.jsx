import { useContext } from 'react';
import { TodoContext } from './context.jsx';


export function useTodos() {

    const {
        state: {
            todos,
            isOpen,
            allTodos,
            status
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo,
        }
    } = useContext(TodoContext);


    return {
        todos,
        addTodo,
        allTodos,
        status,
        isOpen,
        toggleModal,
        deleteTodo,
        updateTodo
    }
}
