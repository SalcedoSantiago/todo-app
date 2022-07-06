import { useContext } from 'react';
import { TodoContext } from './context.jsx';


export function useTodos() {

    const {
        state: {
            todos,
            isOpen,
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
        }
    } = useContext(TodoContext);


    return {
        todos,
        addTodo,
        isOpen,
        toggleModal,
        deleteTodo,
    }
}
