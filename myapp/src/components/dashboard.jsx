import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Import your CSS file
import './navbarcss.css';
import NavigationBar from './navbar';

function Dashboard() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    // Fetch total tasks count
    fetch('http://localhost:8000/api/total-tasks/1')
      .then(response => response.json())
      .then(data => {
        const { totalTasks } = data;
        setTotalTasks(totalTasks); // Set totalTasks to the total number of tasks
      })
      .catch(error => console.error(error));

    // Fetch completed tasks count
    fetch('http://localhost:8000/api/completed-tasks/1')
      .then(response => response.json())
      .then(data => {
        const { completedTasks } = data;
        setCompletedTasks(completedTasks); // Set completedTasks to the count of completed tasks
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="dashboard-container">
        <h1>Task Manager Dashboard</h1>
        <section className="task-summary">
          <h2>Task Summary</h2>
          <div className="summary-card">
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
          </div>
          <div className="summary-card">
            <h3>Completed Tasks</h3>
            <p>{completedTasks}</p>
          </div>
          <div className="summary-card">
            <h3>Pending Tasks</h3>
            <p>{totalTasks - completedTasks}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
