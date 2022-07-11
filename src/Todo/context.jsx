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

const initialState = {
    todo: [
        {
            title: 'Hacer deporte',
            description: 'lorem ipsum',
            status: 'todo',
            labels: ['work'],
            color: '#fff',
            id: "543",
            order: 0,
        },
    ],
    doing: [
        {
            title: 'Estudiar',
            description: 'lorem ipsum',
            status: 'doing',
            labels: ['work'],
            color: '#fff',
            id: "613",
            order: 0,
        },
    ],
    done: [
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
}



function TodoProvider({ children }) {
    const [isOpen, toggleModal] = useState();
    const [todos, setTodos] = useState(initialState);
    const [status, setStatus] = useState(STATUS);
    const flattenTodos = flatten(Object.values(todos));
    const filterStatus = [...STATUS.sort((a, b) => a.order - b.order)].reduce((obj, { name }) => {
        return {
            ...obj,
            [name]: flattenTodos.filter(({ status }) => status == name).map(({ id }) => id),
        };
    }, {})


    const addTodo = (todo, currStatus) => {
        const id = uniqueId();
        setTodos({
            ...todos,
            [currStatus]: [
                ...todos[currStatus],
                {
                    ...todo,
                    id: id
                }
            ]
        }
        )
    }

    const updateTodo = (currentTodo) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === currentTodo.id) {
                return currentTodo
            }
            return todo
        })

        setTodos(newTodos);
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
            flattenTodos,
            status,
            filterStatus
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo,
            reOrderTodos
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