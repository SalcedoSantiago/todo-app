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
        order: 1,
    },
    {
        title: 'Trabajar',
        description: 'lorem ipsum',
        status: 'done',
        labels: ['work'],
        color: '#fff',
        id: "1543",
        order: 0
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

    const todoes = status.map(({ name, order }) => {
        return {
            type: name,
            title: name,
            order: order,
            items: [...todos.filter(({ status }) => status == name)].sort((a, b) => a.order - b.order)
        }
    }
    );

    const allTodos = useMemo(() => [...todoes.sort((a, b) => a.order - b.order)], todoes);

    const addTodo = (todo) => {
        const id = uniqueId();
        setTodos([
            ...todos,
            {
                ...todo,
                id: uniqueId()
            }
        ])
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
                return current;
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
            allTodos,
            status
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo,
            reOrderTodos
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