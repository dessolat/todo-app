import React from 'react';
import PropTypes from 'prop-types';
import SubTodo from './SubTodo';

const SubTodoList = ({ subTodos, parentId }) => (
  <ul className='sub-todo-list'>
    {subTodos.map(subTodo => (
      <SubTodo key={subTodo.id} parentId={parentId} subTodo={subTodo} />
    ))}
  </ul>
);

SubTodoList.propTypes = {
  subTodos: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      finished: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  parentId: PropTypes.number.isRequired
};

export default SubTodoList;
