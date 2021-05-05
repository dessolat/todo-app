import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import '../css/TodoList.css';

const TodoList = ({ todos }) => (
  <ul className='todo-list'>
    {todos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired,
      subTodos: PropTypes.arrayOf(
        PropTypes.exact({
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired,
          finished: PropTypes.bool.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired
};

export default TodoList;
