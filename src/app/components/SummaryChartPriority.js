'use client';
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const SummaryChartPriority = ({ tasks }) => {
  const priorityCounts = ['Low', 'Medium', 'High'].map(priority => ({
    name: priority,
    value: tasks.filter(task => task.priority === priority).length,
  }));

  return (
    <>
      <h5 className="text-center">Tasks by Priority</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={priorityCounts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#00C49F"
            label
          >
            {priorityCounts.map((entry, index) => (
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

export default SummaryChartPriority;
