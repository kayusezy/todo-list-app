// src/components/TaskForm.js
import  { useState } from 'react';
import PropTypes from 'prop-types';

function TaskForm({ onSubmit, initialTask, isEditing }) {
  const [name, setName] = useState(initialTask?.name || '');
  const [description, setDescription] = useState(initialTask?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Please fill out both fields.');
      return;
    }
    onSubmit({ name, description, id: initialTask?.id, completed: initialTask?.completed });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}

// PropTypes validation
TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialTask: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
  }),
  isEditing: PropTypes.bool,
};

// Default props
TaskForm.defaultProps = {
  initialTask: {},
  isEditing: false,
};

export default TaskForm;
