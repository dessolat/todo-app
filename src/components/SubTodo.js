import { useState, useEffect, useContext, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import '../css/SubTodo.css';
import { Context } from '../App';

const SubTodo = ({ subTodo: { id, text, finished }, parentId }) => {
  const [input, setInput] = useState(text);
  const { checkTodo, changeTodo, deleteTodo } = useContext(Context);
  const textRef = useRef(null);

  useEffect(() => {
    !text && textRef.current.focus();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let classList = 'sub-todo';
  finished && (classList += ' finished');

  const handleBlur = event => {
    text !== input && changeTodo(id, input, parentId);
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
      <li className={classList}>
        <label className='label'>
          <input
            className='label__checkbox'
            type='checkbox'
            checked={finished}
            onChange={() => checkTodo(id, parentId)}
          />
          <span className='label__check'>
            <i className='fa fa-check icon'></i>
          </span>
        </label>
        <input
          className='sub-todo__text'
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          ref={textRef}
        />
        <button className='todo__delete-bttn bttn' onClick={() => deleteTodo(id, parentId)}>
          <i className='fa fa-times icon' aria-hidden='true'></i>
        </button>
      </li>
    </>
  );
};

SubTodo.propTypes = {
  subTodo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    finished: PropTypes.bool.isRequired
  }).isRequired,
  parentId: PropTypes.number.isRequired
};

export default memo(SubTodo);
