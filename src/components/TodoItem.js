import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/TodoItem.css';
import { Context } from '../App';
import SubTodoList from './SubTodoList';

const TodoItem = ({ todo: { id, text, finished, subTodos } }) => {
  const [input, setInput] = useState(text);

  const { addTodo, checkTodo, changeTodo, deleteTodo } = useContext(Context);

  let classList = 'todo';
  finished && (classList += ' finished');

  const handleBlur = event => {
    text !== input && changeTodo(id, input);
    event.target.blur();
  };

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleKeyDown = event => {
    event.key === 'Enter' && handleBlur(event);
  };

  return (
    <>
      <li>
        <div className={classList}>
          <label className='label'>
            <input
              className='label__checkbox'
              type='checkbox'
              checked={finished}
              onChange={() => checkTodo(id)}
            />
            <span className='label__check'>
              <i className='fa fa-check icon'></i>
            </span>
          </label>

          <input
            type='text'
            className='todo__text'
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
          <button className='todo__add-sub-bttn bttn' onClick={() => addTodo('', id)}>
            <i className='fa fa-plus icon' aria-hidden='true'></i>
          </button>
          <button className='todo__delete-bttn bttn' onClick={() => deleteTodo(id)}>
            <i className='fa fa-times icon' aria-hidden='true'></i>
          </button>
        </div>

        {subTodos.length > 0 && <SubTodoList subTodos={subTodos} parentId={id} />}
      </li>
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.exact({
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
};

export default TodoItem;
