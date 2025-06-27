'use client';
import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks: filteredTasksFromParent }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(filteredTasksFromParent);
  }, [JSON.stringify(filteredTasksFromParent)]); // ✅ safe dependency

  const handleDelete = (id) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);

    const allStored = JSON.parse(localStorage.getItem('tasks')) || [];
    const finalStored = allStored.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(finalStored));
  };

  return (
    <div className="container mt-4">
      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks to show.</p>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div className="col-md-4 mb-3" key={task.id}>
              <TaskCard task={task} onDelete={() => handleDelete(task.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
