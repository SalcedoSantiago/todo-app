import { createContext, useState, useEffect } from "react";
import { uniqueId } from "lodash";

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
        title: 'Todo initial',
        description: 'lorem ipsum',
        status: 'todo',
        labels: ['work'],
        color: '#fff',
        id: "543",
        priority: 'mid',
        order: 0,
    },
]



function TodoProvider({ children }) {
    const [isOpen, toggleModal] = useState();
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState(STATUS);
    const orderStatus = status.reduce((acc, { name }) => (
        {
            ...acc,
            [name]: todos.filter(({ status }) => status == name).map(({ id }) => id),
        }
    ), {})

    const [statusItems, setStatusItems] = useState(orderStatus);

    useEffect(() => {
        const initTodos = JSON.parse(localStorage.getItem('todos'))
        if (Boolean(initTodos?.length)) {
            const order = status.reduce((acc, { name }) => (
                {
                    ...acc,
                    [name]: initTodos.filter(({ status }) => status == name).map(({ id }) => id),
                }
            ), {});
            setTodos(initTodos)
            setStatusItems(order)
        } else {
            const order = status.reduce((acc, { name }) => (
                {
                    ...acc,
                    [name]: initialState.filter(({ status }) => status == name).map(({ id }) => id),
                }
            ), {});
            setTodos(initialState)
            setStatusItems(order)
        }
    }, [])


    const addTodo = (todo) => {
        const id = Math.random().toString();
        const { status } = todo;

        const TODOS = [
            ...todos, {
                ...todo,
                id: id
            }
        ]
        setTodos(TODOS)

        setStatusItems((items) => {
            return {
                ...items,
                [status]: [
                    ...items[status],
                    id
                ]
            }
        })

        localStorage.setItem('todos', JSON.stringify(TODOS));
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

        const TODOS = todos.map((todo) => {
            if (todo.id == id) {
                return {
                    ...todo,
                    ...currentTodo,
                }
            }
            return todo
        })

        setTodos(TODOS)

        localStorage.setItem('todos', JSON.stringify(TODOS));
    }


    const deleteTodo = (_todo) => {
        if (!_todo) {
            return;
        }
        const newTodos = todos.filter((todo) => todo?.id != _todo?.id)
        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }


    const value = {
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
            setTodos,
            setStatusItems,
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
        </ TodoContext.Provider>
    );
}

export {
    TodoProvider,
    TodoContext
}