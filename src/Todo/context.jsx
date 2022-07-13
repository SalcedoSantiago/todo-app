import { flatten, map, isEqual, uniqueId } from "lodash";
import { createContext, useMemo, useState, useEffect } from "react";
import { useSelectorValue } from 'use-selector';


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
    const orderStatus = status.reduce((acc, { name }) => (
        {
            ...acc,
            [name]: todos.filter(({ status }) => status == name).map(({ id }) => id),
        }
    ), {})

    const [statusItems, setStatusItems] = useState(orderStatus);


    useEffect(() => {
        if (status?.length > STATUS?.length) {
            setStatusItems({
                ...statusItems,
                [status[status.length - 1]?.name]: []
            })
        }
    }, [status])


    const addStatus = (name) => {
        const id = uniqueId();
        setStatus([
            ...status,
            {
                name: name,
                order: status.length + 1
            }
        ])

    }

    const statusToLeft = (statusName) => {
        // const actualOrder = status.findIndex(({ name }) => name === statusName);
        // const element = status[actualOrder - 1];
        // const currrElemnt = status[actualOrder];
        // let newStatus = status;
        // newStatus[actualOrder - 1] = currrElemnt;
        // newStatus[actualOrder] = element;

        // const newStatusWithinMove = status.splice(actualOrder - 1, 1);
        // // console.log('actualOrder', actualOrder);
        // const fromIndex = actualOrder;
        // const toIndex = actualOrder - 1;
        // const element = status.splice(fromIndex, 1)[0];
        // console.log('element',element);
        // const test = status.splice(toIndex, 0, element);
        // console.log('test', test);
        // this.splice(to,0,this.splice(from,1)[0]);
    }


    const deleteStatus = (name) => {
        if (!name) {
            return;
        }

        setTodos((prev) => prev.filter(({ status }) => status != name))
        let newStatusItems = { ...statusItems };
        delete newStatusItems[name];
        setStatusItems(newStatusItems);
    }


    const addTodo = (todo) => {
        const id = uniqueId();
        const { status } = todo;
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
                [status]: [
                    ...items[status],
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
            statusItems,
        },
        actions: {
            addTodo,
            toggleModal,
            deleteTodo,
            updateTodo,
            setTodos,
            addStatus,
            setStatusItems,
            deleteStatus,
            statusToLeft,
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