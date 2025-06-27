'use client';
import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import { differenceInCalendarDays } from 'date-fns';


const DashboardPage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters and Sort
  const [statusFilter, setStatusFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [dueFilter, setDueFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Load tasks from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    setAllTasks(stored);
    setLoading(false);
  }, []);

  // Filtering + Sorting
  useEffect(() => {
    if (!allTasks || allTasks.length === 0) {
      setFilteredTasks([]);
      return;
    }

    setLoading(true);
    let result = [...allTasks];
    const today = new Date();

    // Filter: Status
    if (statusFilter) {
      result = result.filter(task => task.status === statusFilter);
    }

    // Filter: Tags
    if (tagFilter) {
      result = result.filter(task =>
        task.tags?.some(tag =>
          tag.toLowerCase().includes(tagFilter.toLowerCase())
        )
      );
    }

    // Filter: Due Date
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

    // Sort
    if (sortBy === 'Due Date') {
      result.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
      });
    } else if (sortBy === 'Priority') {
      const order = { Low: 1, Medium: 2, High: 3 };
      result.sort((a, b) => {
        const aP = order[a.priority] || 0;
        const bP = order[b.priority] || 0;
        return bP - aP;
      });
    } else if (sortBy === 'Creation Date') {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
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
      <h2 className="mb-4">Task Dashboard</h2>

      {/* Controls */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Status</label>
          <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Tag</label>
          <input
            type="text"
            className="form-control"
            value={tagFilter}
            onChange={e => setTagFilter(e.target.value)}
            placeholder="search tags"
          />
        </div>

        <div className="col-md-3">
          <label>Due Date</label>
          <select className="form-select" value={dueFilter} onChange={e => setDueFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Sort By</label>
          <select className="form-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="Due Date">Due Date</option>
            <option value="Priority">Priority</option>
            <option value="Creation Date">Creation Date</option>
          </select>
        </div>
      </div>

      <div className="mb-3 text-end">
        <button className="btn btn-outline-secondary" onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* Display */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <TaskList tasks={filteredTasks} />
      )}
    </div>
  );
};

export default DashboardPage;
