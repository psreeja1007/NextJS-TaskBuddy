'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className='container'>
      <h2>{task.title}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Due Date:</strong> {displayDate}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Tags:</strong> {task.tags && task.tags.join(', ')}</p>

      <div className="mt-3">
        <button className="btn btn-outline-primary me-2" onClick={handleEdit}>Edit</button>
        <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
      </div>

      <div className="mt-3">
        <button className="btn btn-secondary mb-3" onClick={() => router.push('/')}>
            ← Back to Dashboard
        </button>
      </div>
      

    </div>
  );
};

export default TaskDetails;
