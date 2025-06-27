'use client';
import React, { useEffect, useState, useContext } from 'react';
import TaskList from './components/TaskList';
import { differenceInCalendarDays } from 'date-fns';
import { ThemeContext } from './context/ThemeContext'; // Adjust path if needed
import './styles/FilterStyles.css'


const DashboardPage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [dueFilter, setDueFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  const handleDeleteTask = (id) => {
    const updatedTasks = allTasks.filter(task => task.id !== id);
    setAllTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    setAllTasks(stored);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!allTasks || allTasks.length === 0) {
      setFilteredTasks([]);
      return;
    }

    setLoading(true);
    let result = [...allTasks];
    const today = new Date();

    if (statusFilter) {
      result = result.filter(task => task.status === statusFilter);
    }

    if (tagFilter) {
      result = result.filter(task =>
        task.tags?.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()))
      );
    }

    if (dueFilter === 'Today') {
      result = result.filter(task =>
        new Date(task.dueDate).toDateString() === today.toDateString()
      );
    } else if (dueFilter === 'This Week') {
      result = result.filter(task => {
        const diff = differenceInCalendarDays(new Date(task.dueDate), today);
        return diff >= 0 && diff <= 7;
      });
    }

    if (sortBy === 'Due Date') {
      result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'Priority') {
      const order = { Low: 1, Medium: 2, High: 3 };
      result.sort((a, b) => (order[b.priority] || 0) - (order[a.priority] || 0));
    } else if (sortBy === 'Creation Date') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredTasks(result);
    setLoading(false);
  }, [statusFilter, tagFilter, dueFilter, sortBy, allTasks]);

  const resetFilters = () => {
    setStatusFilter('');
    setTagFilter('');
    setDueFilter('');
    setSortBy('');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📋 Task Dashboard</h2>
        <span className="badge bg-primary fs-6">{filteredTasks.length} Tasks</span>
      </div>

      {/* Filters */}
     {/* Filters */}
<div className="filters-card p-3 mb-4">
  <div className="row gy-3 gx-3">
    <div className="col-sm-6 col-md-3">
      <label>Status</label>
      <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>

    <div className="col-sm-6 col-md-3">
      <label>Tag</label>
      <input type="text" className="form-control" value={tagFilter} onChange={e => setTagFilter(e.target.value)} placeholder="Search tags" />
    </div>

    <div className="col-sm-6 col-md-3">
      <label>Due</label>
      <select className="form-select" value={dueFilter} onChange={e => setDueFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Today">Today</option>
        <option value="This Week">This Week</option>
      </select>
    </div>

    <div className="col-sm-6 col-md-3">
      <label>Sort</label>
      <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="">None</option>
        <option value="Due Date">Due Date</option>
        <option value="Priority">Priority</option>
        <option value="Creation Date">Creation Date</option>
      </select>
    </div>
  </div>

  <div className="text-end mt-3">
    <button
      className={`resetBtn ${darkMode ? 'resetBtnDark' : 'resetBtnLight'}`}
      onClick={resetFilters}
    >
      Reset Filters
    </button>

  </div>
</div>

      {/* Task List */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <TaskList tasks={filteredTasks} onDelete = {handleDeleteTask}/>
      )}
    </div>
  );
};

export default DashboardPage;
