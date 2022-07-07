import { isEqual, uniqueId } from "lodash";
import { createContext, useState } from "react";

const TodoContext = createContext({});


const initialState = {
    todo: {
        type: 'todo',
        order: 1,
        title: 'Todo',
        items: [
            {
                id: 1,
                title: 'comer',
                description: 'comer cada 4hs',
                type: 'text',
                initStatus: 'todo',
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
                id: 213,
                title: 'Dstudiar',
                description: 'Estudiar por dos horas',
                initStatus: 'doing',
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
                id: 23,
                title: 'Levantarse',
                description: 'Levantarse a las 10 am',
                type: 'text',
                initStatus: 'done',
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
                    {
                        ...task,
                        initStatus: task.status,
                        id: uniqueId()
                    }
                ]
            }
        })
    }


    const deleteTodo = (type, todo) => {
        if (!type || !todo) {
            return;
        }
        const currentTodo = todos[type].items.filter((curr) => !isEqual(curr, todo));
        setTodos({
            ...todos,
            [type]: {
                ...todos[type],
                items: currentTodo
            }
        })
    }


    const updateTodo = (currentTodo, type) => {
        if (!currentTodo || !currentTodo?.id || !type) {
            return;
        }

        if (!todos[type] || !Boolean(todos[type].items.length)) {
            return
        }

        const newTodo = todos[type].items.map((todo) => {
            if (todo.id == currentTodo.id) {
                return currentTodo;
            }

            return todo;
        })

        setTodos({
            ...todos,
            [type]: {
                ...todos[type],
                items: newTodo
            }
        })


    }


    const value = {
        state: {
            todos,
            isOpen,
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo
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