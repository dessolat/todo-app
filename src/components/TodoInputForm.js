import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../css/TodoInputForm.css';

const TodoInputForm = ({ addTodo }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    addTodo(input);
    setInput('');
    inputRef.current.focus();
  };

  return (
    <form className='todo__input-form' onSubmit={handleSubmit}>
      <input
        className='todo__input-field'
        type='text'
        onChange={e => setInput(e.target.value)}
        value={input}
        placeholder='Текст новой задачи'
        ref={inputRef}
      />
      <button className='todo__add-bttn bttn' type='submit' disabled={!input.trim()}>
        <i className='fa fa-plus icon' aria-hidden='true'></i>
      </button>
    </form>
  );
};

TodoInputForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default TodoInputForm;
