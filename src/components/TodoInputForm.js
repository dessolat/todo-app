import '../css/TodoInputForm.css';

export default function TodoInputForm({ addTodo, handleInput, inputValue, buttonRef }) {
  return (
    <form className='todo__input-form' onSubmit={addTodo}>
      <input
        className='todo__input-field'
        type='text'
        onChange={handleInput}
        value={inputValue}
        placeholder='Текст новой задачи'
				ref={buttonRef}
      />
      <button
        className='todo__add-bttn bttn'
        type='submit'
        disabled={!inputValue.trim()}>
        +
      </button>
    </form>
  );
}
