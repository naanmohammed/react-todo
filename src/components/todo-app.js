import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

function TodoApp() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (inputText.trim() !== '') {
      const newTodo = { id: uuid(), text: inputText, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputText('');
    }
  }

  function handleTodoRemove(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function handleTodoComplete(id) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id
      ? { ...todo, completed: !todo.completed } : todo)));
  }

  function TodoItem({ todo }) {
    const handleComplete = () => handleTodoComplete(todo.id);
    const handleRemove = () => handleTodoRemove(todo.id);
    return (
      <li className="tasks">
        {todo.text}
        <div className="task_buttons">
          {todo.completed ? (
            <button className="undo_button" type="button" onClick={handleComplete}>Undo</button>
          ) : (
            <>
              <button className="complete_button" type="button" onClick={handleComplete}>✓</button>
              <button className="delete_button" type="button" onClick={handleRemove}>␡</button>
            </>
          )}
        </div>
      </li>
    );
  }

  TodoItem.propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="container">
      <h1>Todo App</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Add</button>
      </form>
      <h4>Pending Task(s)</h4>
      <ul className="pending_tasks">
        {pendingTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <h4>Completed Task(s)</h4>
      <ul className="completed_tasks">
        {completedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
