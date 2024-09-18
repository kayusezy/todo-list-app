// src/App.js
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const editTask = (task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm onSubmit={editingTask ? editTask : addTask} initialTask={editingTask} isEditing={!!editingTask} />
      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={deleteTask} onToggle={toggleTaskCompletion} />
    </div>
  );
}

export default App;
