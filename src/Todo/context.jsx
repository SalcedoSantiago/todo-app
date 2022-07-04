import { Children, createContext } from "react";


const TodoContext = createContext({});


const TodoProvider = ({ children }) => {


    return (
        <TodoContext.Provider>
            {children}
        </TodoContext.Provider>
    )
}

export {
    TodoProvider,
    TodoContext
}