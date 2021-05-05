import './css/App.css';
import React, { useEffect, useState, createContext } from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header';
import TodoInputForm from './components/TodoInputForm';

export const Context = createContext();

const App = () => {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageData = localStorage.getItem('todo-app');

    storageData && setTodos(JSON.parse(storageData));
  }, []);

  useEffect(() => {
    localStorage.setItem('todo-app', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, parentId = null) => {
    if (parentId === null) {
      setTodos(prevTodos => {
        const maxId = Math.max(0, ...prevTodos.map(todo => todo.id));

        return [...prevTodos, { id: maxId + 1, text, finished: false, subTodos: [] }];
      });
      return;
    }
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === parentId) {
          const maxId = Math.max(0, ...todo.subTodos.map(subTodo => subTodo.id));
          return {
            ...todo,
            subTodos: [...todo.subTodos, { id: maxId + 1, text, finished: false }]
          };
        }
        return todo;
      });
    });
  };

  const checkTodo = (id, parentId = null) => {
    if (parentId === null) {
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? { ...todo, finished: !todo.finished } : todo))
      );
      return;
    }
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === parentId) {
          const subTodos = todo.subTodos.map(subTodo =>
            subTodo.id === id ? { ...subTodo, finished: !subTodo.finished } : subTodo
          );
          return {
            ...todo,
            subTodos
          };
        }
        return todo;
      })
    );
  };

  const changeTodo = (id, text, parentId = null) => {
    if (parentId === null) {
      setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? { ...todo, text } : todo)));
      return;
    }
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === parentId) {
          const subTodos = todo.subTodos.map(subTodo =>
            subTodo.id === id ? { ...subTodo, text } : subTodo
          );
          return { ...todo, subTodos };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id, parentId = null) => {
    if (parentId === null) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      return;
    }
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === parentId) {
          const subTodos = todo.subTodos.filter(subTodo => subTodo.id !== id);
          return { ...todo, subTodos };
        }
        return todo;
      })
    );
  };

  return (
    <div className='wrapper'>
      <Header />
      <Context.Provider value={{ addTodo, checkTodo, changeTodo, deleteTodo }}>
        {todos.length ? (
          <TodoList todos={todos} />
        ) : (
          <p className='empty-todo-warning'>Список задач пуст, добавьте новую задачу.</p>
        )}
      </Context.Provider>
      <TodoInputForm addTodo={addTodo} />
    </div>
  );
};

export default App;
