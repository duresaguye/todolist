import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/todos/');
    setTodos(response.data);
  };

  const addTodo = async () => {
    const response = await axios.post('http://127.0.0.1:8000/api/todos/', { title, description });
    setTodos([...todos, response.data]);
    setTitle('');
    setDescription('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      
      <h1 className="title">Todo List</h1>
     
      <div className="input-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <button onClick={addTodo} className="button">
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div>
              <strong className="todo-title">{todo.title}</strong> - {todo.description}
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
