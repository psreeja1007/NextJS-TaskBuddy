'use client';
import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks: filteredTasksFromParent , onDelete}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(filteredTasksFromParent);
  }, [JSON.stringify(filteredTasksFromParent)]); // stable

  // const handleDelete = (id) => {
  //   const updated = tasks.filter(task => task.id !== id);
  //   setTasks(updated);

  //   const allStored = JSON.parse(localStorage.getItem('tasks')) || [];
  //   const finalStored = allStored.filter(task => task.id !== id);
  //   localStorage.setItem('tasks', JSON.stringify(finalStored));
  // };

  return (
    <>
      <h4 className="mb-3">Your Tasks</h4>
      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks to show.</div>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div className="col-md-6 col-lg-4 mb-4" key={task.id}>
              <TaskCard task={task} onDelete={() => onDelete(task.id)} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TaskList;
