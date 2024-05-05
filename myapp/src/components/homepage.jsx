import React from 'react';
import { Link } from 'react-router-dom';
import './hpmepagecss.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Taskify</h1>
      <p>Manage your tasks efficiently with Task Manager</p>
      <p>

      </p>
<p>A Task Manager app is a powerful tool designed to help users efficiently organize and manage their tasks and schedules. With intuitive features and a user-friendly interface, it allows individuals to create, update, and delete tasks effortlessly. Users can add details such as task titles, descriptions, due dates, and times, enabling them to prioritize tasks and stay on top of their commitments. Additionally, the app offers task completion tracking, enabling users to mark tasks as completed once finished. Whether used for personal 
  task management or team collaboration, the Task Manager app empowers users to boost productivity and achieve their goals effectively.</p>
      <p>
        Our Taskify Helps you manage your day to days easily and efficiently
      </p>
      
      <Link to="/signup">Create your account / Login</Link>
    </div>
  );
}

export default HomePage;
