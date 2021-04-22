import './css/App.css';
import React, { useEffect, useState, useRef, createContext } from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header';
import TodoInputForm from './components/TodoInputForm';

export const Context = createContext();

export default function App() {
  let [todos, setTodos] = useState([]);
  let [input, setInput] = useState('');

  const buttonRef = useRef(null);

  useEffect(() => {
    const storageData = localStorage.getItem('todo-app');

    if (storageData) {
      setTodos(JSON.parse(storageData));
    }

    buttonRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('todo-app', JSON.stringify(todos));
  }, [todos]);

  const checkTodo = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, finished: !todo.finished } : todo))
    );
  };

  const deleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    buttonRef.current.focus();
  };
  const handleInput = event => setInput(event.target.value);

  const addTodo = event => {
    event.preventDefault();

    setTodos(prevTodos => {
      const maxId = Math.max(0, ...prevTodos.map(todo => todo.id));

      return [...prevTodos, { id: maxId + 1, text: input, finished: false }];
    });
    setInput('');
    buttonRef.current.focus();
  };

  return (
    <div className='wrapper'>
      <Header />
      <Context.Provider value={{ checkTodo, deleteTodo }}>
        {todos.length ? (
          <TodoList todos={todos} />
        ) : (
          <p className='empty-todo-warning'>Список задач пуст, добавьте новую задачу.</p>
        )}
      </Context.Provider>
      <TodoInputForm
        addTodo={addTodo}
        handleInput={handleInput}
        inputValue={input}
        buttonRef={buttonRef}
      />
    </div>
  );
}
