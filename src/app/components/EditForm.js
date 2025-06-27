'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import '../styles/CreateFormStyles.css'

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  dueDate: Yup.date()
    .transform((value, originalValue) => originalValue === "" ? undefined : value)
    .required('Please select a due date'),
  priority: Yup.string().oneOf(['Low', 'Medium', 'High']),
  tags: Yup.string(),
  status: Yup.string().oneOf(['Todo', 'In Progress', 'Done']),
});

const EditForm = ({ taskId }) => {
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Load the task by ID
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToEdit = tasks.find((task) => task.id === taskId);

    if (!taskToEdit) {
      alert('Task not found!');
      router.push('/dashboard');
      return;
    }

    setInitialData(taskToEdit);

    // Reset form with the task's current values
    reset({
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate.split('T')[0], // ✅ Extract only the YYYY-MM-DD part
        priority: taskToEdit.priority,
        tags: taskToEdit.tags.join(', '),
        status: taskToEdit.status,
    });

  }, [taskId, reset, router]);

  const onSubmit = (data) => {
    const updatedTask = {
      ...initialData,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      status: data.status,
    };

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = existingTasks.map(task =>
      task.id === taskId ? updatedTask : task
    );

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    router.push('/');
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <h2 className="form-heading mb-4 text-center">Edit Task</h2>
      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input className="form-control" {...register('title')} />
        <p className="text-danger">{errors.title?.message}</p>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="3" {...register('description')} />
      </div>

      {/* Due Date */}
      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input type="date" className="form-control" {...register('dueDate')} />
        <p className="text-danger">{errors.dueDate?.message}</p>
      </div>

      {/* Priority */}
      <div className="mb-3">
        <label className="form-label">Priority</label>
        <select className="form-select" {...register('priority')}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Tags */}
      <div className="mb-3">
        <label className="form-label">Tags (comma-separated)</label>
        <input className="form-control" {...register('tags')} />
      </div>

      {/* Status */}
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select className="form-select" {...register('status')}>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <button type="submit" className="btn btn-outline-primary">Update Task</button>
    </form>
  );
};

export default EditForm;
