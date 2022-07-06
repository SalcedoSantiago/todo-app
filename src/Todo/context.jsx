import { isEqual } from "lodash";
import { createContext, useState } from "react";

const TodoContext = createContext({});


const initialState = {
    todo: {
        type: 'todo',
        order: 1,
        title: 'Todo',
        items: [
            {
                title: 'comer',
                text: 'comer cada 4hs',
                type: 'text',
                status: 'todo'
            }
        ]
    },
    doing: {
        type: 'doing',
        order: 1,
        title: 'Doing',
        items: [
            {
                title: 'Dstudiar',
                text: 'Estudiar por dos horas',
                type: 'text',
                status: 'doing'
            }
        ]
    },
    done: {
        type: 'done',
        order: 1,
        title: 'Done',
        items: [
            {
                title: 'Levantarse',
                text: 'Levantarse a las 10 am',
                type: 'text',
                status: 'done'
            }
        ]
    }
}


function TodoProvider({ children }) {
    const [isOpen, toggleModal] = useState();

    const [todos, setTodos] = useState(initialState)

    const addTodo = (type = false, task) => {
        if (!type) {
            return;
        }

        setTodos({
            ...todos,
            [type]: {
                ...todos[type],
                items: [
                    ...todos[type].items,
                    task
                ]
            }
        })
    }


    const deleteTodo = (type, todo) => {

        if (!type || !todo) {
            return;
        }
        console.log(' todos[type]', todos[type]);
        console.log('todo', todo);

        const currentTodo = todos[type].items.filter((curr) => !isEqual(curr, todo));

        setTodos({
            ...todos,
            [type]: {
                ...todos[type],
                items: currentTodo
            }
        })

    }

    const value = {
        state: {
            todos,
            isOpen
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo
        }
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}

export {
    TodoProvider,
    TodoContext
}