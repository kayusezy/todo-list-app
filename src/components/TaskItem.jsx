// src/components/TaskItem.js
import PropTypes from 'prop-types';

function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <li
      style={{
        textDecoration: task.completed ? 'line-through' : 'none',
        cursor: 'pointer',
      }}
      onClick={() => onToggle(task.id)}
    >
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <button onClick={(e) => { e.stopPropagation(); onEdit(task); }}>Edit</button>
      <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>Delete</button>
    </li>
  );
}

// PropTypes validation
TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TaskItem;
