'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '../context/ThemeContext'; // Adjust path if needed
import '../styles/FilterStyles.css'

const NavBar = () => {
  const pathname = usePathname();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const handleExport = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'bg-body-tertiary'}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">Task Buddy</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} href="/">Dashboard</Link>
            <Link className={`nav-link ${pathname === '/create' ? 'active' : ''}`} href="/create">Create a New Task</Link>
            <Link className={`nav-link ${pathname === '/summary' ? 'active' : ''}`} href="/summary">Summary</Link>
            <Link className="nav-link" href="/import">Import Tasks</Link>
          </div>
        </div>

        <button className={`btn btn-outline-secondary ms-2 mx-3 resetBtn ${darkMode ? 'resetBtnDark' : 'resetBtnLight'}`} onClick={handleExport}>Export Tasks</button>
        <button type="button" className={`btn btn-outline-secondary ${darkMode ? 'resetBtnDark' : 'resetBtnLight'}`} onClick={toggleTheme}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
