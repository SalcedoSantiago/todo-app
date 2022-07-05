import { useContext } from 'react';
import { TodoContext } from './context.jsx';


export function useTodos() {

    const {
        state: {
            todos
        },
        actions: {
            addTodo
        }
    } = useContext(TodoContext);


    return {
        todos,
        addTodo
    }
}
