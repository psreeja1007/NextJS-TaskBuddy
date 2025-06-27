'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Badge } from 'react-bootstrap';

const TaskCard = ({ task, onDelete }) => {
  const router = useRouter();
  const { id, title, description, dueDate, priority, status, tags } = task;

  const formattedDate = new Date(dueDate);
  const displayDate = `${formattedDate.getDate()} ${formattedDate.toLocaleString('default', { month: 'long' })}, ${formattedDate.getFullYear()}`;

  // Edit handler
  const handleEdit = (e) => {
    e.stopPropagation(); // prevent card click
    router.push(`/edit/${id}`);
  };

  // Delete handler
  const handleDelete = (e) => {
    e.stopPropagation(); // prevent card click
    const confirmDelete = window.confirm(`Are you sure you want to delete the task: "${title}"?`);
    if (confirmDelete) {
        onDelete(id);
        
    }
    };


  // Whole card click → navigate to details
  const handleCardClick = () => {
    router.push(`/task/${id}`);
  };

  return (
    <div
      className="card shadow-sm h-100 hover-shadow"
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Due: {displayDate}</h6>

          {/* Badges */}
          <div className="mb-2">
            <Badge bg={priority === 'High' ? 'danger' : priority === 'Medium' ? 'warning' : 'secondary'}>
              {priority}
            </Badge>{' '}
            <Badge bg={status === 'Done' ? 'success' : status === 'In Progress' ? 'info' : 'dark'}>
              {status}
            </Badge>
          </div>

          {/* Tags */}
          <div className="mb-3">
            {tags && tags.map((tag, idx) => (
              <Badge bg="light" text="dark" className="me-1" key={idx}>{tag}</Badge>
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
