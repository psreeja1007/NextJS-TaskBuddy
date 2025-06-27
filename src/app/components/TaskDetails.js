'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/TaskDetailsStyles.css';

const TaskDetails = ({ taskId }) => {
  const router = useRouter();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const found = tasks.find((t) => t.id === taskId);
    if (!found) {
      alert('Task not found!');
      router.push('/');
    } else {
      setTask(found);
    }
  }, [taskId, router]);

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updated = tasks.filter((t) => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updated));
    router.push('/');
  };

  const handleEdit = () => {
    router.push(`/edit/${taskId}`);
  };

  if (!task) return <p>Loading...</p>;

  const formattedDate = new Date(task.dueDate);
  const displayDate = `${formattedDate.getDate()} ${formattedDate.toLocaleString('default', { month: 'long' })}, ${formattedDate.getFullYear()}`;

  return (
    <div className='task-details-container'>
      <h2>{task.title}</h2>

      <div className="task-details-container">
      <div className="task-details-row">
        <div className="task-details-label">Description</div>
        <div className="task-details-value">{task.description || '-No Description-'}</div>
      </div>

      <div className="task-details-row">
        <div className="task-details-label">Due Date</div>
        <div className="task-details-value">{displayDate}</div>
      </div>
      <div className="task-details-row">
        <div className="task-details-label">Priority</div>
        <div className="task-details-value">{task.priority}</div>
      </div>

      <div className="task-details-row">
        <div className="task-details-label">Status</div>
        <div className="task-details-value">{task.status}</div>
      </div>

      <div className="task-details-row">
        <div className="task-details-label">Tags</div>
        <div className="task-details-value">{task.tags && task.tags.join(', ')}</div>
      </div>
      </div>

      <div className="mt-3">
        <button className="btn btn-outline-success mx-3" onClick={() => router.push('/')}>
            ← Back to Dashboard
        </button>
        <button className="btn btn-outline-primary me-2" onClick={handleEdit}>Edit</button>
        <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>     
      </div>
      </div>
  );
};

export default TaskDetails;
