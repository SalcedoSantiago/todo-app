import { useContext } from 'react';
import { TodoContext } from './context.jsx';


export function useTodos() {

    const {
        state: {
            todos,
            isOpen,
            allTodos,
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
        isOpen,
        toggleModal,
        deleteTodo,
        updateTodo
    }
}
