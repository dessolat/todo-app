import { useContext } from 'react';
import '../css/TodoItem.css';
import { Context } from '../App';

export default function TodoItem({ todo }) {
  let classList = 'todo__item';
  todo.finished && (classList += ' finished');
  const { checkTodo, deleteTodo } = useContext(Context);
  const { id, text, finished } = todo;

  return (
    <>
      <li className={classList}>
        <input
          className='todo__checkbox'
          id={`todo__checkbox-${id}`}
          type='checkbox'
          checked={finished}
          onChange={() => checkTodo(id)}
        />
        <label className='todo__text' htmlFor={`todo__checkbox-${id}`}>
          {text}
        </label>
        <button className='todo__delete-bttn bttn' onClick={() => deleteTodo(id)}>
          &times;
        </button>
      </li>
    </>
  );
}
