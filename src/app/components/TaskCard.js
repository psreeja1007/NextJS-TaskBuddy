'use client';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Badge } from 'react-bootstrap';
import '../styles/TaskStyles.css';
import { ThemeContext } from '../context/ThemeContext'; // adjust path as needed

const TaskCard = ({ task, onDelete }) => {
  const router = useRouter();
  const { darkMode } = useContext(ThemeContext);

  const { id, title, dueDate, priority, status, tags } = task;

  const displayDate = new Date(dueDate).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const handleEdit = (e) => {
    e.stopPropagation();
    router.push(`/edit/${id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete task: "${title}"?`)) {
      onDelete(id);
    }
  };

  const handleCardClick = () => {
    router.push(`/task/${id}`);
  };

  const getCardClass = () => {
    const base = darkMode ? 'card-dark' : 'card-light';
    return `task-card ${base}-${priority.toLowerCase()}`;
  };

  return (
    <div className={`card h-100 ${getCardClass()}`} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Due: {displayDate}
          </h6>

          {/* Badges */}
          <div className="mb-2 task-badges">
            <Badge bg="secondary" className="me-1">{priority}</Badge>
            <Badge bg="light" text="dark" className="me-1">
              <span
                className={`status-dot ${
                  status === 'Done' ? 'status-done' :
                  status === 'In Progress' ? 'status-inprogress' :
                  'status-todo'
                }`}
              />
              {status}
            </Badge>
          </div>

          {/* Tags */}
          <div className="mb-3 task-badges">
            {tags && tags.map((tag, idx) => (
              <Badge bg="light" text="dark" key={idx}>#{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-3">
          <Button variant="outline-primary" onClick={handleEdit}>Edit</Button>
          <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
