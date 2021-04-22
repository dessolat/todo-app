import React from 'react';
import TodoItem from './TodoItem';
import '../css/TodoList.css';

export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        );
      })}
    </ul>
  );
}
