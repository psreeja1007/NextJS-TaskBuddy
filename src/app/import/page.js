'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import '../styles/ImportStyles.css'

const ImportPage = () => {
  const router = useRouter();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedTasks = JSON.parse(text);

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
    <div className="container d-flex justify-content-center align-items-center mt-5">
  <div className="card import-card">
    <h3 className="text-center mb-3">📥 Import Tasks</h3>
    <p className="text-muted-custom text-center mb-4">
      Select a <code>.json</code> file exported from Task Buddy
    </p>
    <input
      type="file"
      accept=".json"
      onChange={handleFileUpload}
      className="form-control mb-3"
    />
    <div className="text-center">
      <small className="text-muted-custom">
        Imported tasks will be added to your existing list.
      </small>
    </div>
  </div>
</div>

  );
};

export default ImportPage;
