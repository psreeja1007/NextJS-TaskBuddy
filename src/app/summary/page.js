'use client';
import React, { useEffect, useState } from 'react';
import SummaryChartStatus from '../components/SummaryChartStatus';
import SummaryChartPriority from '../components/SummaryChartPriority';
import SummaryHighlights from '../components/SummaryHighlights';

const SummaryPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Task Summary</h2>
      <SummaryHighlights tasks={tasks}/>
      <div className="row">
        <div className="col-md-6">
          <SummaryChartStatus tasks={tasks} />
        </div>
        <div className="col-md-6">
          <SummaryChartPriority tasks={tasks}/>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
