// src/TodoApp.js
import React, { useState, useEffect } from 'react';
import './TodoApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TodoApp() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState('#007bff');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    const storedTheme = localStorage.getItem('themeColor');
    const storedMode = localStorage.getItem('darkMode');
    if (storedTodos) setTodos(storedTodos);
    if (storedTheme) setThemeColor(storedTheme);
    if (storedMode) setDarkMode(JSON.parse(storedMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [todos, themeColor, darkMode]);

  const handleAdd = () => {
    if (task.trim() === '') {
      toast.error('🚫 Please enter a task!', {
        position: 'top-center',
        autoClose: 2000,
        theme: darkMode ? 'dark' : 'colored',
      });
    } else {
      setTodos([...todos, { text: task, completed: false }]);
      toast.success('✅ Task added!', {
        position: 'top-center',
        autoClose: 2000,
        theme: darkMode ? 'dark' : 'colored',
      });
      setTask('');
    }
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTask = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
    toast.info('🗑️ Task deleted', {
      position: 'bottom-left',
      autoClose: 1500,
      theme: darkMode ? 'dark' : 'light',
    });
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`todo-container ${darkMode ? 'dark' : ''}`}
      style={{ '--theme-color': themeColor }}
    >
      <ToastContainer />
      <div className="header">
        <h2>📝 My To-Do List</h2>
        <button className="icon-btn" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="theme-picker">
        <label>🎨 Theme:</label>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
      </div>

      <ul>
        <AnimatePresence>
          {todos.map((todo, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className={todo.completed ? 'completed' : ''}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              <span>{todo.text}</span>
              <button className="icon-btn" onClick={() => deleteTask(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default TodoApp;