import React, { useState, useEffect } from 'react';
import './TaskManager.css';
import NavigationBar from './navbar';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []); // Empty dependency array ensures it only runs once on mount

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks/1'); // Assuming userId 1 for now
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTask || !newDescription || !newDate || !newTime) return;

    try {
      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Assuming userId 1 for now
          title: newTask,
          description: newDescription,
          date: newDate,
          time: newTime,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newTaskObj = { ...data, completed: false };
        setTasks([...tasks, newTaskObj]);
        setNewTask('');
        setNewDescription('');
        setNewDate('');
        setNewTime('');
        window.location.href = '/taskmanager';
        if (!isUniqueIds(tasks.concat(newTaskObj))) {
          console.warn('Duplicate task IDs detected!');
        }
      } else {
        console.error('Failed to add task:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleCompleted = async (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);

    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: updatedTasks.find(task => task.id === taskId).completed }),
      });

      if (!response.ok) {
        console.error('Failed to update task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'task') {
      setNewTask(value);
    } else if (name === 'description') {
      setNewDescription(value);
    } else if (name === 'date') {
      setNewDate(value);
    } else if (name === 'time') {
      setNewTime(value);
    }
  };

  const isUniqueIds = (tasks) => {
    const idSet = new Set();
    for (const task of tasks) {
      idSet.add(task.id);
    }
    return idSet.size === tasks.length;
  };

  return (
    <div>
      <NavigationBar />
      <div className="task-manager-container">
        <h1>Task Manager</h1>
        <div className="task-input">
          <input type="text" name="task" value={newTask} onChange={handleInputChange} placeholder="Add a new task" />
          <input type="text" name="description" value={newDescription} onChange={handleInputChange} placeholder="Add description" />
          <input type="date" name="date" value={newDate} onChange={handleInputChange} />
          <input type="time" name="time" value={newTime} onChange={handleInputChange} />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}> {/* Add key prop here */}
              <input type="checkbox" checked={task.completed} onChange={() => toggleCompleted(task.id)} />
              <span className={task.completed ? 'completed' : ''}>{task.title}</span>
              <span>{task.description}</span>
              <span>{task.date}</span>
              <span>{task.time}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskManager;
