'use client';
import React from 'react';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import '../styles/SummaryStyles.css';


const SummaryHighlights = ({ tasks }) => {
  const today = new Date();

  const thisWeekTasks = tasks.filter(task => {
    const due = new Date(task.dueDate);
    const daysLeft = differenceInCalendarDays(due, today);
    return daysLeft >= 0 && daysLeft <= 7;
  });

  const completed = tasks.filter(task => task.status === 'Done');
  const pending = tasks.filter(task => task.status !== 'Done');

  return (
    <div className="summary-highlights mb-4">
      <h5>Quick Stats</h5>
      <ul>
        <li>✅ Completed Tasks: {completed.length}</li>
        <li>📅 Due This Week: {thisWeekTasks.length}</li>
        <li>🕐 Pending Tasks: {pending.length}</li>
      </ul>
    </div>

  );
};

export default SummaryHighlights;
