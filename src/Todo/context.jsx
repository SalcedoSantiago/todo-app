import { createContext, useState } from "react";

const TodoContext = createContext({});

function TodoProvider({ children }) {

    const [todos, setTodos] = useState({
        nextUp: {
            title: 'Next Up',
            items: {
                432: {
                    title: '👊',
                    description: 'lorem ipsum'
                },
                435: {
                    title: '🤟',
                    description: 'lorem ipsum'
                },
                4351: {
                    title: '🤟',
                    description: 'lorem ipsum'
                }
            }
        },
        inProgress: {
            title: 'In Progress',
            items: {}
        },
        Complete: {
            title: 'Complete',
            items: {}
        }
    })

    const addTodo = (type = false, task) => {
        console.log('test');
    }


    const value = {
        state: {
            todos
        },
        actions: {
            addTodo,
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