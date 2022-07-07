import { map, isEqual, uniqueId } from "lodash";
import { createContext, useMemo, useState } from "react";

const TodoContext = createContext({});

const STATUS = [
    {
        name: 'todo',
        order: 1
    },
    {
        name: 'doing',
        order: 2
    },
    {
        name: 'done',
        order: 3
    }

]

const initialState = {
    1: {
        title: 'Hacer deporte',
        description: 'lorem ipsum',
        status: 'todo',
        labels: ['work'],
        order: 0
    },
    2: {
        title: 'Estudiar',
        description: 'lorem ipsum',
        status: 'doing',
        labels: ['work'],
        order: 0
    },
    3: {
        title: 'Comer',
        description: 'lorem ipsum',
        status: 'done',
        labels: ['work'],
        order: 1
    },
    4: {
        title: 'Trabajar',
        description: 'lorem ipsum',
        status: 'done',
        labels: ['work'],
        order: 0
    },
    5: {
        title: 'Dormir',
        description: 'lorem ipsum',
        status: 'done',
        labels: ['work'],
        order: 2
    }
}



function TodoProvider({ children }) {
    const [isOpen, toggleModal] = useState();
    const [todos, setTodos] = useState(initialState);
    const [status, setStatus] = useState(STATUS);

    const todoes = status.map(({ name, order }) => {
        return {
            type: name,
            title: name,
            order: order,
            items: [...Object.values(todos).filter(({ status }) => status == name)].sort((a, b) => a.order - b.order)
        }
    }
    )
    
    const allTodos = [...todoes.sort((a, b) => a.order - b.order)];

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
            allTodos
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo
        }
    }


    if (!Boolean(allTodos.length)) {
        return <>
            test
        </>
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