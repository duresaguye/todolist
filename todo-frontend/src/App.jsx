import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/todos/');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (editMode) {
      await updateTodo(editId);
    } else {
      const response = await axios.post('http://127.0.0.1:8000/api/todos/', { title, description });
      setTodos([...todos, response.data]);
    }
    setTitle('');
    setDescription('');
    setEditMode(false);
    setEditId(null);
  };

  const updateTodo = async (id) => {
    const response = await axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, { title, description });
    setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditMode(true);
    setEditId(todo.id);
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
          {editMode ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div>
              <strong className="todo-title">{todo.title}</strong> - {todo.description}
            </div>
            <div>
              <button onClick={() => startEdit(todo)} className="edit-button">
                Edit
              </button>
               <span>&nbsp;&nbsp;</span>
              <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
