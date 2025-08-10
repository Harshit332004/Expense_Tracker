import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

// Custom hook to use our todo context
export const useTodo = () => useContext(TodoContext);

// Provider component to wrap our app and provide todo functionality
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todo'); // Adjust this URL to match your backend
      const data = await response.json();
      console.log(data);
      
      setTodos(data.todo.map(todo => ({
        id: todo.id,
        description: todo.title,
        isCompleted: todo.status
      })));
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  // Add a new todo
  const addTodo = async (description) => {
    try {
      const response = await fetch('http://localhost:3000/add_todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: description, status: false })
      });
      const newTodo = await response.json();
      setTodos(prevTodos => [...prevTodos, {
        id: newTodo.id,
        description: newTodo.title,
        isCompleted: newTodo.status
      }]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo , setTodos}}>
      {children}
    </TodoContext.Provider>
  );
};