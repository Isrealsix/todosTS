import React, { useState } from 'react'
import Todo from '../models/todo'


// Defined the type
type TodosContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
}

// Created the Context and the expected types
export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: () => {},
    removeTodo: (id: string) => {}
})


// Defined the Context Provider and the methods
const TodosContextProvider: React.FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([])

    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);
        setTodos(prevTodos => prevTodos.concat(newTodo))
    }

    const removeTodoHandler = (todoId: string) => {
        setTodos(prevTodos => {
        return prevTodos.filter(todo => todo.id !== todoId);
    })
    }

    const contextValue: TodosContextObj= {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    }

    return <TodosContext.Provider value={contextValue}>
        {props.children}
    </TodosContext.Provider>
}

export default TodosContextProvider;