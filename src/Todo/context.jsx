import { flatten, map, isEqual, uniqueId, isObject } from "lodash";
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

const initialState = [
    {
        title: 'Hacer deporte',
        description: 'lorem ipsum',
        status: 'todo',
        labels: ['work'],
        color: '#fff',
        id: "543",
        order: 0,
    },
    {
        title: 'Estudiar',
        description: 'lorem ipsum',
        status: 'doing',
        labels: ['work'],
        color: '#fff',
        id: "613",
        order: 0,
    },
    {
        title: 'Comer',
        description: 'lorem ipsum',
        status: 'done',
        labels: ['work'],
        color: '#fff',
        id: "13",
        order: 0,
    },
    {
        title: 'Trabajar',
        description: 'lorem ipsum',
        status: 'done',
        labels: ['work'],
        color: '#fff',
        id: "1543",
        order: 1
    },
    {
        title: 'Dormir',
        description: 'lorem ipsum',
        status: 'done',
        labels: ['work'],
        color: '#fff',
        id: "35",
        order: 2
    }
]



function TodoProvider({ children }) {
    const [isOpen, toggleModal] = useState();
    const [todos, setTodos] = useState(initialState);
    const [status, setStatus] = useState(STATUS);

    const filterStatus = [...STATUS.sort((a, b) => a.order - b.order)].reduce((obj, { name }) => {
        return {
            ...obj,
            [name]: todos.filter(({ status }) => status == name).map(({ id }) => id),
        };
    }, {})

    const [statusItems, setStatusItems] = useState(filterStatus);

    const addTodo = (todo, currStatus) => {
        const id = uniqueId();
        setTodos([
            ...todos,
            {
                ...todo,
                id: id
            }
        ])

        setStatusItems((items) => {
            return {
                ...items,
                [currStatus]: [
                    ...items[currStatus],
                    id
                ]
            }
        })
    }

    const updateTodo = (currentTodo) => {
        const { id, status } = currentTodo;
        const prevTodo = todos.filter((todo) => todo.id == id)[0];

        if (currentTodo.status != prevTodo.status) {
            setStatusItems(prev => {
                return {
                    ...prev,
                    [prevTodo.status]: prev[prevTodo.status].filter((item) => item != id),
                    [status]: [
                        ...prev[status],
                        id
                    ]
                }
            })
        }

        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id == id) {
                    return {
                        ...todo,
                        ...currentTodo,
                    }
                }
                return todo
            })
        })
    }


    const reOrderTodos = (currentTodo) => {
        const newTodos = todos.map((todo) => {
            const current = currentTodo.filter((cur) => cur.id == todo.id)[0]
            if (!!current) {
                return current
            }
            return todo;
        })
        setTodos(newTodos)
    }

    const deleteTodo = (_todo) => {
        if (!_todo) {
            return;
        }
        const newTodos = todos.filter((todo) => todo?.id != _todo?.id)
        setTodos(newTodos)
    }


    const value = {
        state: {
            todos,
            isOpen,
            status,
            filterStatus,
            statusItems
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo,
            reOrderTodos,
            setTodos,
            setStatusItems
        }
    }


    if (!Boolean(todos)) {
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