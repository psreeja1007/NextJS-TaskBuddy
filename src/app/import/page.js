'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const ImportPage = () => {
  const router = useRouter();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedTasks = JSON.parse(text);

      // Optionally validate structure
      if (!Array.isArray(importedTasks)) {
        alert("Invalid task format.");
        return;
      }

      const existing = JSON.parse(localStorage.getItem("tasks")) || [];
      const updated = [...existing, ...importedTasks];
      localStorage.setItem("tasks", JSON.stringify(updated));

      localStorage.setItem("toastInfo", JSON.stringify({
        message: "Tasks imported successfully!",
        type: "success"
      }));

      router.push("/");
    } catch (error) {
      alert("Failed to import tasks. Make sure it's a valid JSON.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Import Tasks</h3>
      <p>Select a `.json` file exported from Task Buddy:</p>
      <input type="file" accept=".json" onChange={handleFileUpload} className="form-control" />
    </div>
  );
};

export default ImportPage;
