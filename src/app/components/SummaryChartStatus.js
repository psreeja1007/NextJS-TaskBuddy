'use client';
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/SummaryStyles.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const SummaryChartStatus = ({ tasks }) => {
  const statusCounts = ['Todo', 'In Progress', 'Done'].map(status => ({
    name: status,
    value: tasks.filter(task => task.status === status).length,
  }));

  return (
    <>
      <h5 className="text-center">Tasks by Status</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusCounts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {statusCounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default SummaryChartStatus;
